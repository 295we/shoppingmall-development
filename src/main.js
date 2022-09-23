import Vue from 'vue';
import App from './App.vue';
// router首字母必须小写
import router from '@/router';
// 引入一个全局组件 三级联动
import TypeNav from '@/components/TypeNav';
Vue.component('TypeNav', TypeNav);
// 引入一个全局组件 轮播图
import Carousel from '@/components/Carousel';
Vue.component('Carousel', Carousel);
// 引入一个全局组件 分页器
import Pagination from '@/components/Pagination';
Vue.component('Pagination', Pagination);
// 引入全局的ajax请求接口
import * as API from '@/api';

// 引入store仓库
import store from '@/store';
// 引入mockServe.js文件 因为moServe.js中已经调用函数了，所以这里不需要调用
import '@/mock/mockServe';
// 引入element-ui 按需引入
import { MessageBox } from 'element-ui';
// 引入图片懒加载插件vue-lazyload,可以携带配置对象
import VueLazyload from 'vue-lazyload';
import DJ from './assets/dj-lazy.gif'; //引入迪迦
Vue.use(VueLazyload, {
  loading: DJ,
});
// 引入表单校验插件vee-validate
import '@/plugins/validate';

// 使用按需引入的element-ui组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false;

const vm = new Vue({
  beforeCreate() {
    // 全局事件总线的配置
    Vue.prototype.$bus = this;
    //所有的组件实例上都能获取到所有ajax请求接口
    Vue.prototype.$API = API;
  },
  render: h => h(App),
  // 组件中会有$router和$route属性
  router,
  // 组件实例的身上会多了一个$store属性
  store,
}).$mount('#app');
