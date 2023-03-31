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

  describe('element', () => {
    test('simple element div', () => {
      const ast = baseParse('<div></div>');
      const element = ast.children[0];

      expect(element).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div'
      });
    });
  });

  describe('text', () => {
    test('simple text div', () => {
      const ast = baseParse('some text');
      const text = ast.children[0];

      expect(text).toStrictEqual({
        type: NodeTypes.TEXT,
        content: 'some text'
      });
    });
  });
});
