import { h } from '../../lib/guide-mini-vue.esm.js';
import { Foo } from './Foo.js';

window.self = null;
export const App = {
  name: 'App',
  // 必须要写 render
  render() {
    window.self = this;
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        onClick() {
          console.log('click');
        }
      },
      // 'hi, ' + this.msg
      // [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
      [h('div', {}, 'hi, ' + this.msg), h(Foo, { count: 1 })]
    );
  },

  setup() {
    return {
      msg: 'mini-vue'
    };
  }
};
