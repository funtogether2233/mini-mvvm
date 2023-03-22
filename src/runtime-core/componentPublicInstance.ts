import { hasOwn } from '../shared/index';

const publicPropertiesMap = {
  // i 是 instance 缩写 组件实例对象
  $el: (i) => i.vnode.el,
  $slots:(i)=>i.slots
};

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    // setupState
    const { setupState, props } = instance;
    if (key in setupState) {
      return setupState[key];
    }
    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  }
};
