import { createVNode, Fragment } from '../vnode';

export function renderSlot(slots, name: string, props = {}) {
  const slot = slots[name];
  if (slot) {
    if (typeof slot === 'function') {
      return createVNode(Fragment, {}, slot(props));
    }
  }
}
