import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api';
import { getUUID } from '@/utils/uuid_token';
export default {
  state: {
    goodInfo: {},
    // 游客的临时身份
    uuid_token: getUUID(),
  },
  mutations: {
    GETGOODINFO(state, goodInfo) {
      state.goodInfo = goodInfo;
    },
  },
  actions: {
    async getGoodInfo(context, skuid) {
      let result = await reqGoodsInfo(skuid);
      if (result.code == 200) {
        context.commit('GETGOODINFO', result.data);
      }
    },
    // 向购物车添加或更新产品
    async addOrUpdateShopCart({ commit }, params) {
      // 加入购物车返回的结果
      // 我们只是将购物车的数据发送给服务器，服务器没有给我们返回数据，但是code=200了
      // 所以不需要三连环存数据
      let result = await reqAddOrUpdateShopCart(params.skuId, params.skuNum);
      if (result.code != 200) {
        return Promise.reject(result.code);
      } else {
        return 'Success';
      }
    },
  },
  getters: {
    categoryView(state) {
      // 当前计算出的 categoryView属性值至少是一个空对象，假的报错就不会有了。
      return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
      return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || [];
    },
  },
};
