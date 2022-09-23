// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
Vue.use(VueRouter);

// 需要用到store作为路由跳转的条件
import store from '@/store';

// 重写push && replace方法
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location).catch(err => {
      return err;
    });
  }
};
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 配置路由
let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 返回一个对象y:0,代表滚动条在最上方
    return { y: 0 };
  },
});

// 全局前置守卫，在路由跳转之前进行判断
router.beforeEach((to, form, next) => {
  // to,form,都是路由对象，next 放行函数，放行到指定的路由 next('/login') next(false),回到form的路由对象
  // 用户登录了token就一定存在，用户退出登录了token一定消失
  let token = store.state.user.token;
  // 用户信息中的用户名 因为userInfo就算里面啥也没有进行if判断时仍然转化为true，但是里面的name可能是undefined
  let userName = store.state.user.userInfo.name;
  if (token) {
    // 用户登录了
    if (to.path == '/login' || to.path == '/register') {
      // 用户登录了想去login 那就让他去login的时候去home
      alert('你已经登录，请不要重复登录');
      next('/home');
    } else {
      // 用户登录了不去login 但是如果去其他路由，刷新页面会导致用户名丢失，所以我们需要在登录了去其他路由的时候，拿到userInfo
      if (userName) {
        next();
      } else {
        // 没有用户信息了，就先派发获取用户信息的action，再放行
        store
          .dispatch('getUserInfo')
          .then(result => {
            // 获取用户信息成功
            next();
          })
          .catch(err => {
            // token失效了，无法通过token获取到用户信息 需要重新登录
            // 清除token
            alert('用户信息已过期,请重新登录');
            store.dispatch('userLogout');
            next('/login');
          });
      }
    }
  } else {
    // 用户没有登录 不能去pay,paysuccess,trade,center,如果去的不是这些路由，需要放行
    let toPath = to.path; //先存一下path，因为下一个path跟这个path可能不一样
    if (
      toPath.indexOf('/trade') != -1 ||
      toPath.indexOf('/pay') != -1 ||
      toPath.indexOf('/center') != -1
    ) {
      alert('请先登录');
      // 加上query参数在login组件中进行条件判断从而指定路由跳转而非只跳home
      next('/login?redirect=' + toPath);
    } else {
      next();
    }
  }
});

export default router;
