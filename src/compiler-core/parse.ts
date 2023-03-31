import { NodeTypes } from './ast';

// 左右定界符
const openDelimiter = '{{';
const closeDelimiter = '}}';

export function baseParse(content: string) {
  const context = createParserContext(content);
  return createRoot(parseChildren(context));
}

function parseChildren(context) {
  const nodes: any = [];
  let node;
  if (context.source.startsWith(openDelimiter)) {
    node = parseInterpolation(context);
  }
  nodes.push(node);
  return nodes;
}

function parseInterpolation(context) {
  // 右定界符 index
  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length
  );

  // 去除左定界符
  advanceBy(context, openDelimiter.length);

  // 获取 content 和其长度
  const rawContentLength = closeIndex - openDelimiter.length;
  const rawContent = context.source.slice(0, rawContentLength);
  const content = rawContent.trim();

  // 去除插值内容和右定界符
  advanceBy(context, rawContentLength + closeDelimiter.length);

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
