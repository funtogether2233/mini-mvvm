export const extend = Object.assign;

export const isObject = (val) => {
  return val !== null && typeof val === 'object';
};

export const hasChanged = (value, newValue) => {
  return !Object.is(value, newValue);
};

// 必须是 on+一个大写字母的格式开头
export const isOn = (key) => /^on[A-Z]/.test(key);

export function hasOwn(val, key) {
  return Object.prototype.hasOwnProperty.call(val, key);
}

// 首字母大写
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// 添加 on 前缀，并且首字母大写
export const toHandlerKey = (str: string) =>
  str ? `on${capitalize(str)}` : ``;

// 把烤肉串命名方式转换成驼峰命名方式
const camelizeRE = /-(\w)/g;
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
};
