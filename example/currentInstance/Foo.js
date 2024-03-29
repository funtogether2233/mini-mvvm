import { h, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js';

export const Foo = {
  name: 'Foo',
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    console.log('Foo: ', instance);
    return {};
  },
  render() {
    return h('div', {}, 'foo');
  }
};
