import { reqCartList, reqDelSku, reqUpdateCheckedById } from '@/api';

export default {
  state: {
    cartList: [],
  },
  mutations: {
    GETCARTLIST(state, cartList) {
      state.cartList = cartList;
    },
  },
  actions: {
    // 获取购物车列表的数据
    async getCartList({ commit }) {
      let result = await reqCartList();
      if (result.code == 200) {
        commit('GETCARTLIST', result.data);
      }
    },
    // 删除购物车中的某个商品
    async deleteCartListBySkuId({ commit }, skuId) {
      let result = await reqDelSku(skuId);
      if (result.code == 200) {
        return 'Success';
      } else {
        return Promise.reject(result.code);
      }
    },
    // 修改购物车某个产品的选中状态
    async updateChecked({ commit }, { skuId, isChecked }) {
      let result = await reqUpdateCheckedById(skuId, isChecked);
      if (result.code == 200) {
        return 'Success';
      } else {
        return Promise.reject(result.code);
      }
    },

    deleteAllCheckedCart(context) {
      // 获取购物车中全部的产品
      let Lists = context.getters.cartList.cartInfoList;
      let PromiseAll = [];
      Lists.forEach(cartInfoList => {
        let promise =
          cartInfoList.isChecked == 1
            ? context.dispatch('deleteCartListBySkuId', cartInfoList.skuId)
            : '';
        PromiseAll.push(promise);
      });
      // 如果数组里有失败的Promise，返回的就是失败的Promise，如果都是成功的Promise，返回的就是成功的Promise
      return Promise.all(PromiseAll);
    },
    // 修改全部产品选中的状态
    updateAllChecked(context, checked) {
      let Lists = context.getters.cartList.cartInfoList;
      let PromiseAll = [];
      Lists.forEach(cartInfoList => {
        let promise = context.dispatch('updateChecked', {
          skuId: cartInfoList.skuId,
          isChecked: checked,
        });
        PromiseAll.push(promise);
      });
      return Promise.all(PromiseAll);
    },
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || {};
    },
  },
};
