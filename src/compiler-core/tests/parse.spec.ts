import { ElementTypes, NodeTypes } from '../ast';
import { baseParse } from '../parse';

describe('Parse', () => {
  describe('interpolation', () => {
    test('simple interpolation', () => {
      const ast = baseParse('{{ message }}');
      const interpolation = ast.children[0];

      expect(interpolation).toStrictEqual({
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: `message`
        }
      });
    });
  });

  describe('Element', () => {
    test('simple div', () => {
      const ast = baseParse('<div></div>');
      const element = ast.children[0];

      expect(element).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div'
        // tagType: ElementTypes.ELEMENT,
        // children: [
        //   {
        //     type: NodeTypes.TEXT,
        //     content: 'hello'
        //   }
        // ]
      });
    });
  });
});
