import { NodeTypes } from './ast';

export function transform(root, options) {
  const context = createTransformContext(root, options);

  // dfs 遍历
  traverseNode(root, context);

  // 修改 text content
}

function createTransformContext(root, options) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || []
  };

  return context;
}

// dfs 遍历
function traverseNode(node, context) {
  const { nodeTransforms } = context;
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    transform(node);
  }

  traverseChildren(node, context);
}

function traverseChildren(node, context) {
  const children = node.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context);
    }
  }
}
