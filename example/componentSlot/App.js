import { createTextVNode, h } from '../../lib/guide-mini-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  name: 'App',
  // 必须要写 render
  render() {
    const app = h('div', {}, 'App');
    // const foo = h(Foo, {}, h('p', {}, '123'));
    const foo = h(
      Foo,
      {},
      {
        hander: () => h('p', {}, 'hander'),
        content: ({ test }) => [
          h('p', [], 'content ' + test),
          createTextVNode('你好呀')
        ],
        footer: () => h('p', {}, 'footer')
      }
    );

    return h('div', {}, [app, foo]);
  },

  setup() {
    return {};
  }
};
