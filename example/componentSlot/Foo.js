import { h, renderSlot } from '../../lib/guide-mini-vue.esm.js';

export const Foo = {
  setup() {
    return {};
  },
  render() {
    const foo = h('p', {}, 'foo');
    console.log(this.$slots);
    const test = 4;
    return h('div', {}, [
      renderSlot(this.$slots, 'hander'),
      foo,
      renderSlot(this.$slots, 'content', { test }),
      renderSlot(this.$slots, 'footer')
    ]);
  }
};
