import { reqAddressInfo, reqOrderInfo } from '@/api';

export default {
  state: {
    address: [],
    orderInfo: {},
  },
  mutations: {
    GETUSERADDRESS(state, address) {
      state.address = address;
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  actions: {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
      let result = await reqAddressInfo();
      if (result.code == 200) {
        commit('GETUSERADDRESS', result.data);
      }
    },
    // 获取用户的订单信息
    async getOrderInfo({ commit }) {
      let result = await reqOrderInfo();
      if (result.code == 200) {
        commit('GETORDERINFO', result.data);
      }
    },
  },
  getters: {},
};
