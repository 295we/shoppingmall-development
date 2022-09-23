import { v4 as uuid } from 'uuid';
// 要生成一个随件的字符串且每次执行不能发生变化，游客身份要持久存储，使用本地存储
export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  if (!uuid_token) {
    uuid_token = uuid();
    localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  // 这里的uuid_token在很多语言中被称之为"单例"，就是唯一的实例
  return uuid_token;
};
