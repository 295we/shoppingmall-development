1. 开发 Search 模块中的 TypeNav 商品分类菜单（过渡动画效果）
   过渡动画：前提组件|元素务必要有 v-if|v-show 指令才可以进行过渡动画

2. 现在咱们的商品分类三级列表可以进行优化
   将发送 ajax 请求交给 App.vue 的 mounted 这样就只需要发送一次请求

3. 合并 params 和 query 参数

4. 开发 Home 首页当中的 ListContainer 组件与 Floor 组件
   但是这样需要知道一件事情：服务器返回的数据（接口）只有商品分类菜单分类数据，对于 ListContainer 与 Floor 组件的数据服务器是没有提供的。
   mock 数据（模拟）：如果你想 mock 数据，需要用到一个插件 mockjs

使用步骤： 
   1.在项目中 src 文件夹中创建 mock 文件夹 
   2.准备 JSON 数据（mock 文件夹中创建相应的.json 文件数据） 注意： json 格式数据需要格式化一下不能留有空格否则数据无法响应 
   3.把 mock 数据需要的图片资源放在 public 文件夹中【public 文件夹在打包的时候，会把相应的资源原封不动的放到 dist 文件夹中】
   4.在mock文件夹下创建mockServe.js，通过mockjs插件实现模拟数据
   5.mockServe.js文件在入口文件中引入（至少需要执行一次才能模拟数据）

5. ListContainer组件的开发重点
   安装Swiper插件：最新版本8，安装Swiper5比较安全
   npm i swiper@5 --save 【carousel:轮播图】
   使用方法 引入js,css，一定要先写html骨架，然后再写js代码，官网都会提供