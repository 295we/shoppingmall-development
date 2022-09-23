import Mock from 'mockjs';
// 把我们创建的JSON数据格式引入进来
// webpack默认对外暴露的资源：图片，json数据，css样式
import banner from './banner.json';
import floor from './floor.json';

//开始mock数据 第一个参数：请求的地址，第二个参数：请求的数据
Mock.mock('/mock/banner', { code: 200, data: banner });
Mock.mock('/mock/floor', { code: 200, data: floor });
