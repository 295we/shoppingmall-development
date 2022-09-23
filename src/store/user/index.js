import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from '@/api';

import { setToken, getToken, removeToken } from '@/utils/token';
// 登录与注册的模块，使用的是同一个模块

export default {
  state: {
    code: '',
    token: getToken(), //封装的函数，用于获取本地存储中的token
    userInfo: {},
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code;
    },
    USERLOGIN(state, token) {
      state.token = token;
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    CLEAR(state) {
      // 删除仓库和本地存储的相关用户信息
      state.token = '';
      state.userInfo = {};
      removeToken();
    },
  },
  actions: {
    // 获取验证码
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone);
      if (result.code == 200) {
        commit('GETCODE', result.data);
        return 'Success';
      } else {
        return Promise.reject(result.code);
      }
    },
    // 用户注册
    async userRegister({ commit }, userInfo) {
      let result = await reqUserRegister(userInfo);
      if (result.code == 200) {
        return 'Success';
      } else {
        return Promise.reject(result);
      }
    },
    // 用户登录
    async userLogin({ commit }, params) {
      let result = await reqUserLogin(params);
      // 服务器下发的token是某一个用户的唯一标识
      // 将来前端经常带着token找服务器要用户信息进行展示
      if (result.code == 200) {
        commit('USERLOGIN', result.data.token);
        // 封装的一个函数，用于持久化存储token，下次刷新vuex里的token任然存在
        setToken(result.data.token);
        return 'Success';
      } else {
        return Promise.reject(result.code);
      }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      let result = await reqUserInfo();
      if (result.code == 200) {
        commit('GETUSERINFO', result.data);
        return 'Success';
      } else {
        return Promise.reject(result.code);
      }
    },
    // 退出登录
    async userLogout({ commit }) {
      // 向服务器发一次请求，通知服务器删除一些数据,以及删除本地的TOKEN，删除user仓库的state
      let result = await reqLogout();
      if (result.code == 200) {
        // action里不能操作state，提交mutations修改state
        commit('CLEAR');
        return 'Success';
      } else {
        return Promise.reject(result.code);
      }
    },
  },
  getters: {},
};
