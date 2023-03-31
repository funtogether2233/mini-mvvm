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
  return createRoot(parseChildren(context, []));
}

function parseChildren(context, ancestors) {
  const nodes: any = [];

  while (!isEnd(context, ancestors)) {
    let node;
    const s = context.source;

    if (s.startsWith(openDelimiter)) {
      // 插值
      node = parseInterpolation(context);
    } else if (s[0] === '<') {
      // element 标签
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors);
      }
    }

    if (!node) {
      node = parseText(context);
    }

    nodes.push(node);
  }
  return nodes;
}

function isEnd(context, ancestors) {
  // 遇到结束标签
  const s = context.source;
  if (s.startsWith('</')) {
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const tag = ancestors[i].tag;
      if (startsWithEndTagOpen(s, tag)) {
        return true;
      }
    }
  }

  // 有值
  return !s;
}

function parseText(context) {
  let endIndex = context.source.length;
  let endTokens = ['<', openDelimiter];

  for (let i = 0; i < endTokens.length; i++) {
    // 遇到插值
    const index = context.source.indexOf(endTokens[i]);
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }

  const content = parseTextData(context, endIndex);
  console.log(content);

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

function parseElement(context, ancestors) {
  // 两次执行 parseTag 删除标签
  const element = parseTag(context, TagType.Start);

  // 收集 element
  ancestors.push(element);

  element.children = parseChildren(context, ancestors);

  // 弹出 element
  ancestors.pop();

  // 头尾标签相同则解析
  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End);
  } else {
    throw new Error(`缺少结束标签:${element.tag}`);
  }

  return element;
}

// 以  </ 开头的且和 tag 一样
function startsWithEndTagOpen(source: string, tag: string) {
  return (
    source.startsWith('</') &&
    source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase()
  );
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
