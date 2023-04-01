import { NodeTypes } from './ast';

export function transform(root, options = {}) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);

  createRootCodegen(root, context);
}

function createTransformContext(root, options) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || []
  };

  return context;
}

function createRootCodegen(root, context) {
  root.codegenNode = root.children[0];
  // const { children } = root;

  // // 只支持有一个根节点
  // // 并且还是一个 single text node
  // const child = children[0];

  // // 如果是 element 类型的话 ， 那么我们需要把它的 codegenNode 赋值给 root
  // // root 其实是个空的什么数据都没有的节点
  // // 所以这里需要额外的处理 codegenNode
  // // codegenNode 的目的是专门为了 codegen 准备的  为的就是和 ast 的 node 分离开
  // if (child.type === NodeTypes.ELEMENT && child.codegenNode) {
  //   const codegenNode = child.codegenNode;
  //   root.codegenNode = codegenNode;
  // } else {
  //   root.codegenNode = child;
  // }
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
