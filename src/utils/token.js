export const setToken = token => {
  // 持久化存储token
  localStorage.setItem('TOKEN', token);
};
export const getToken = () => {
  // 用于读取token的函数
  return localStorage.getItem('TOKEN');
};

export const removeToken = () => {
  // 清除本地存储的TOKEN
  return localStorage.removeItem('TOKEN');
};
