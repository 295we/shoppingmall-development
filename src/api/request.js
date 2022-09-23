// 对于axios进行二次封装
import axios from 'axios';
// 引入进度条模块
import nprogress from 'nprogress';
// start:进度条的开始 done:进度条的结束
// 引入进度条样式
import 'nprogress/nprogress.css';

// 引入vuex的仓库
import store from '@/store';

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.这里的request就是axios只不过咱们可以稍微配置一下
const requests = axios.create({
  // 基础路径，发请求的时候，路径当中会出现"api"
  baseURL: '/api',
  //   代表请求超时的时间为5s（5s内如果没有响应就为失败的请求）
  timeout: 5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use(config => {
  nprogress.start();
  if (store.state.detail.uuid_token) {
    // 给请求头添加字段（userTempId）：和后台商量好了
    config.headers.userTempId = store.state.uuid_token;
  }
  if (store.state.user.token) {
    // 给请求头添加字段，将用户token带给服务器
    config.headers.token = store.state.user.token;
  }
  // config:配置对象，对象里面有一个属性很重要，headers请求头
  return config;
});
// 响应拦截器
requests.interceptors.response.use(
  response => {
    // 服务器成功的回调：服务器响应数据回来以后，响应拦截器可以监测到，可以做一些事情
    nprogress.done();
    return response.data;
  },
  error => {
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('fail'));
  }
);

export default requests;
