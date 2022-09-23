import { reqGetSearchInfo } from '@/api';

// search模块的store
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  async getSearchList(context, value) {
    let result = await reqGetSearchInfo(value);
    if (result.code == 200) {
      context.commit('GETSEARCHLIST', result.data);
    }
  },
};
// 计算属性，在项目中为了简化仓库中的数据而生
const getters = {
  // 当前search仓库中的state,如果服务器的数据没有及时回来，就返回一个空数组，不至于报错
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
