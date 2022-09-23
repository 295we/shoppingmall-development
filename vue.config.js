const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 打包时扔掉map映射文件
  productionSourceMap: true, //调为false则扔掉
  devServer: {
    proxy: {
      '/api': {
        //请求前缀，匹配所有以‘/api’开头的请求路径
        target: 'http://gmall-h5-api.atguigu.cn', //请求的服务器地址
      },
    },
  },
});
