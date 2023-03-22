import { h, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  name: 'App',
  // 必须要写 render
  render() {
    // emit
    return h('div', {}, [h('p', {}, 'currentInstance demo'), h(Foo)]);
  },

  setup() {
    const instance = getCurrentInstance();
    console.log('App: ', instance);
    return {};
  }
};
