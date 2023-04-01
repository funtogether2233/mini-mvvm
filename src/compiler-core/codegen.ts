import { NodeTypes } from './ast';
import { TO_DISPLAY_STRING, helperNameMap } from './runtimeHelpers';

export function generate(ast) {
  const context = createCodegenContext();
  const { push } = context;

  genFunctionPreamble(ast, context);

  const functionName = 'render';
  const args = ['_ctx', '_cache'];
  const signature = args.join(', ');

  push(`function ${functionName}(${signature}){`);
  push('return ');
  genNode(ast.codegenNode, context);
  push('}');

  return {
    code: context.code
  };
}

function genFunctionPreamble(ast: any, context) {
  const { push } = context;
  const VueBinging = 'Vue';
  const aliasHelper = (s) => `${helperNameMap[s]}: _${helperNameMap[s]}`;
  console.log(ast.helpers.length);
  if (ast.helpers.length > 0) {
    console.log('yes');
    push(
      `const { ${ast.helpers.map(aliasHelper).join(', ')} } = ${VueBinging}`
    );
  }
  push('\n');

  push('return ');
}

function createCodegenContext() {
  const context = {
    code: '',
    push(source) {
      context.code += source;
    },
    helper(key) {
      return `_${helperNameMap[key]}`;
    }
  };

  return context;
}

function genNode(node, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context);
      break;

    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context);
      break;

    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context);
      break;

    default:
      break;
  }
}

function genExpression(node, context) {
  const { push } = context;
  push(`${node.content}`);
}

function genInterpolation(node, context) {
  const { push, helper } = context;
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(')');
}

function genText(node, context) {
  const { push } = context;
  push(`'${node.content}'`);
}