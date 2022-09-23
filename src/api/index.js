// 当前的这个模块：对api进行统一管理
import requests from './request';
import mockRequests from './mockRequest';
// 三级联动的接口
// 发请求：axios发请求返回的结果是Promise对象
export const reqCategoryList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'GET' });
// 获取banner（Home首页轮播图接口）
export const reqGETBannerList = () =>
  mockRequests({ url: '/banner', method: 'GET' });
// 获取floor组件的数据
export const reqFloorList = () => {
  return mockRequests.get('/floor');
};
// 获取搜索模块的数据 地址：/api/list 请求方式：POST 需要带参数
// 当前的这个接口给服务器传递的参数至少为空对象
export const reqGetSearchInfo = (params = {}) =>
  requests({
    method: 'POST',
    url: '/list',
    data: params,
  });

// 获取产品详情信息的接口
export const reqGoodsInfo = skuid => {
  return requests.get(`/item/${skuid}`);
};
// 将产品添加到购物车当中（或者更新某个产品的数量）
// /api/cart/addToCart/{skuId}/{skuNum} POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests.post(`/cart/addToCart/${skuId}/${skuNum}`);
};

// 获取购物车列表数据的接口 /api/cart/cartList  method:GET
export const reqCartList = () => requests.get('/cart/cartList');

// 删除购物车产品的接口 URL://api/cart/deleteCart/{skuId} method:DELETE
export const reqDelSku = skuId => requests.delete(`/cart/deleteCart/${skuId}`);

// 修改商品的选中状态 URL://api/cart/checkCart/{skuId}/{isChecked} method:GET
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests.get(`/cart/checkCart/${skuId}/${isChecked}`);

// 获取验证码 URL:/api/user/passport/sendCode/{phone} method:GET
export const reqGetCode = phone =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' });

// 注册 URL:/api/user/passport/register method:POST  data:{phone,code,password}
export const reqUserRegister = params =>
  requests.post('/user/passport/register', params);

// 登录 URL:/api/user/passport/login method:POST data:{phone,password}
export const reqUserLogin = params =>
  requests.post('/user/passport/login', params);

// 获取用户信息【需要带着用户的token向服务器要用户的信息】URL:/api/user/passport/auth/getUserInfo (GET)
export const reqUserInfo = () =>
  requests.get('/user/passport/auth/getUserInfo');

// 退出登录 url:/api/user/passport/logout get请求
export const reqLogout = () => requests.get('/user/passport/logout');

// 获取用户地址信息 url:/api/user/userAddress/auth/findUserAddressList method:get
export const reqAddressInfo = () =>
  requests.get('/user/userAddress/auth/findUserAddressList');

// 获取商品清单 url:/api/order/auth/trade method:get
export const reqOrderInfo = () => requests.get('/order/auth/trade');

// 提交订单的接口 URL:/api/order/auth/submitOrder?tradeNo={tradeNo} method:post
export const reqSubmitOrder = (tradeNo, params) =>
  requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, params);

// 获取支付信息 URL:/api/payment/weixin/createNative/{orderId}  method:get
export const reqPayInfo = orderId =>
  requests.get(`/payment/weixin/createNative/${orderId}`);

//获取支付订单状态 URL:/api/payment/weixin/queryPayStatus/{orderId} method:get
export const reqPayStatus = orderId =>
  requests.get(`/payment/weixin/queryPayStatus/${orderId}`);

// 获取个人中心我的订单的数据 /api/order/auth/{page}/{limit} method:get
export const reqMyorderList = (page, limit) =>
  requests.get(`/order/auth/${page}/${limit}`);
