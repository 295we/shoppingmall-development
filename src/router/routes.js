export default [
  {
    name: 'home',
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true },
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false },
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false },
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true },
  },
  {
    name: 'detail',
    path: '/detail/:skuid',
    component: () => import('@/pages/Detail'),
    meta: { show: true },
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true },
  },
  {
    name: 'shopcart',
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true },
  },
  {
    name: 'trade',
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    // 路由独享守卫 前置
    beforeEnter: (to, from, next) => {
      // 如果要去trade页，必须从shopcart而来
      if (from.path == '/shopcart' || from.path == '/login') {
        next();
      } else {
        next(false); //用于不让路由跳转，停留在当前路由
      }
    },
  },
  {
    name: 'pay',
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true },
  },
  {
    name: 'center',
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        name: 'myorder',
        path: 'myorder',
        component: () => import('@/pages/Center/MyOrder'),
      },
      {
        name: 'grouporder',
        path: 'grouporder',
        component: () => import('@/pages/Center/GroupOrder'),
      },
      // 二级路由重定向
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
  },
  // 路由重定向，在项目跑起来的时候，访问“/”，立马让他定向到Home路由组件
  {
    path: '*',
    redirect: '/home',
  },
];
