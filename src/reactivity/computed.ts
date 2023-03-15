import { ReactiveEffect } from './effect';

class ComputedRefImpl {
  private _getter: any;
  private _dirty: boolean = true;
  private _value: any;
  private _effect: ReactiveEffect;

  constructor(getter) {
    this._getter = getter;

    this._effect = new ReactiveEffect(getter, () => {
      // scheduler 实现依赖响应式对象的值发生改变时修改 dirty
      if (!this._dirty) {
        this._dirty = true;
      }
    });
  }

  get value() {
    // 首次 getter，二次调用返回缓存值
    if (this._dirty) {
      this._dirty = false;
      this._value = this._effect.run();
    }
    return this._value;
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter);
}
