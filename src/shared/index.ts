export const extend = Object.assign;

export const isObject = (val) => {
  return val !== null && typeof val === 'object';
};

export const hasChanged = (value, newValue) => {
  return !Object.is(value, newValue);
};

// 必须是 on+一个大写字母的格式开头
export const isOn = (key) => /^on[A-Z]/.test(key);
