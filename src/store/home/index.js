import { reqCategoryList, reqGETBannerList, reqFloorList } from '@/api';

// home模块的store
const state = {
  // state中数据默认初始值别瞎写，因为组件中可能要v-for （根据接口的返回值去初始化）
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  async categoryList(context) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      context.commit('CATEGORYLIST', result.data);
    }
  },
  // 获取轮播图首页的数据
  async bannerList(context) {
    let result = await reqGETBannerList();
    if (result.code == 200) {
      context.commit('BANNERLIST', result.data);
    }
  },
  // 获取floor数据
  async floorList(context) {
    let result = await reqFloorList();
    if (result.code == 200) {
      context.commit('FLOORLIST', result.data);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
