import { h, provide, inject } from '../../lib/guide-mini-vue.esm.js';

const ProviderOne = {
  name: 'ProviderOne',
  setup() {
    provide('foo', 'fooVal');
    provide('bar', 'barVal');
    return {};
  },
  render() {
    return h('div', {}, [h('p', {}, 'Provider'), h(ProviderTwo)]);
  }
};

const ProviderTwo = {
  name: 'ProviderTwo',
  setup() {
    provide('foo', 'fooTwo');
    const foo = inject('foo');
    return { foo };
  },
  render() {
    return h('div', {}, [h('p', {}, `ProviderTwo - ${this.foo}`), h(Consumer)]);
  }
};

const Consumer = {
  name: 'Consumer',
  setup() {
    const foo = inject('foo');
    const bar = inject('bar');
    const baz = inject('baz', 'bazDefault');
    return {
      foo,
      bar
    };
  },
  render() {
    return h('div', {}, `Consumer: - ${this.foo} - ${this.bar}`);
  }
};

export default {
  name: 'App',
  setup() {},
  render() {
    return h('div', {}, [h('p', {}, 'apiInject'), h(ProviderOne)]);
  }
};
