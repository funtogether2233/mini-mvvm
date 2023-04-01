import { generate } from '../codegen';
import { baseParse } from '../parse';
import { transform } from '../transform';
import { transformExpression } from '../transforms/transformExpression';

describe('codegen', () => {
  it('string', () => {
    const ast = baseParse('hi');
    transform(ast);
    const { code } = generate(ast);

    // 快照测试
    expect(code).toMatchSnapshot();
  });

  it('interpolation', () => {
    const ast = baseParse('{{message}}');
    transform(ast, {
      nodeTransforms: [transformExpression]
    });
    const { code } = generate(ast);

    // 快照测试
    expect(code).toMatchSnapshot();
  });

  it('element', () => {
    const ast = baseParse('<div></div>');
    transform(ast, {
      nodeTransforms: []
    });
    const { code } = generate(ast);

    // 快照测试
    expect(code).toMatchSnapshot();
  });
});
