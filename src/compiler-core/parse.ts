import { NodeTypes } from './ast';

const enum TagType {
  Start,
  End
}

// 左右定界符
const openDelimiter = '{{';
const closeDelimiter = '}}';

export function baseParse(content: string) {
  const context = createParserContext(content);
  return createRoot(parseChildren(context));
}

function parseChildren(context) {
  const s = context.source;
  const nodes: any = [];
  let node;

  if (s.startsWith(openDelimiter)) {
    // 插值
    node = parseInterpolation(context);
  } else if (s[0] === '<') {
    // element 标签
    if (/[a-z]/i.test(s[1])) {
      node = parseElement(context);
    }
  }

  if (!node) {
    node = parseText(context);
  }

  nodes.push(node);
  return nodes;
}

function parseText(context) {
  const content = parseTextData(context, context.source.length);

  return { type: NodeTypes.TEXT, content };
}

// 获取并推进内容
function parseTextData(context, length) {
  // 获取
  const content = context.source.slice(0, length);

  // 推进
  advanceBy(context, content.length);

  return content;
}

function parseElement(context) {
  // 两次执行 parseTag 删除标签
  const element = parseTag(context, TagType.Start);
  parseTag(context, TagType.End);
  return element;
}

function parseTag(context, type: TagType): any {
  // 正则解析出 element 标签
  const match: any = /^<\/?([a-z]*)/i.exec(context.source);
  const tag = match[1];

  // 删除标签
  advanceBy(context, match[0].length);
  advanceBy(context, 1);

  if (type === TagType.End) {
    return;
  }
  return { type: NodeTypes.ELEMENT, tag };
}

function parseInterpolation(context) {
  // 右定界符 index
  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length
  );

  // 删除左定界符
  advanceBy(context, openDelimiter.length);

  // 获取 content 和其长度
  const rawContentLength = closeIndex - openDelimiter.length;
  const rawContent = parseTextData(context, rawContentLength);
  const content = rawContent.trim();

  // 删除插值内容和右定界符
  advanceBy(context, closeDelimiter.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content
    }
  };
}

// 字符向前推进
function advanceBy(context, numberOfCharacters) {
  context.source = context.source.slice(numberOfCharacters);
}

function createRoot(children) {
  return {
    children
  };
}

function createParserContext(content: String) {
  return {
    source: content
  };
}
