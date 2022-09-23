1: vue-cli脚手架初始化项目
node + webpack + 淘宝镜像

node_modules文件夹：项目依赖
public文件夹：一般放置一些静态资源（图片），放在public文件夹的静态资源，webpack进行打包的时候，会原封不动的打包到dist文件夹中

src文件夹（程序员源代码文件夹）：
    assets文件夹：一般放置静态资源（一般放置的是多个组件共用的静态资源），需要注意放置在assets文件夹里面的静态资源，在webpack打包的时候，webpack会把静态资源当做一个模块打包到js文件里
    components文件夹：一般放置的是非路由组件（常用的全局组件）
    App.vue：整个项目中唯一的根组件，Vue当中的组件（后缀名为.vue）
    main.js：程序的入口文件，也是整个程序中最先执行的文件

babel.config.js文件：配置babel相关

package.json文件：相当于项目的“身份证”，记录项目叫什么、项目中有哪些依赖、项目怎么运行。

package-lock.json文件：一个缓存性的文件

README.md文件：项目的说明性文件

2: 项目的其他配置

2.1项目运行起来的时候，让浏览器自动打开
---package.json
  "scripts": {
    "serve": "vue-cli-service serve --open",
  },

2.2eslint校验工具的关闭。
在根目录下的vue.config.js文件中
---module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
});


2.3src文件夹简写方法，配置别名。
jsconfig.json配置别名@提示【@代表的是src文件夹，这样将来文件过多，找的时候方便很多】
{
  "compilerOptions":{
    "baseUrl":"./",
    "paths":{
      "@/*":["src/*"]
    }
  }
  "exclude":["node_modules","dist"]
}


3: 项目路由的分析
vue-router
前端所谓的路由：KV键值对。
key:URL(地址栏中的路径)
value:相应的路由组件
注意：项目上中下结构

路由组件：
Home首页路由组件、Search路由组件、Login登录路由、Register注册路由
非路由组件：
Header 所有页面都有
Footer【在首页、搜索页】，但是在登录|注册页面没有

4: 完成非路由组件Header与Footer业务

5: 完成路由组件的搭建
vue-router
在上面的分析的时候，路由组件应该有四个：Home、Search、Register、Login
---components文件夹：经常放置的是非路由组件（或共用的全局组件）
---pages|views文件夹：经常放置路由组件

5.1: 配置路由
项目中配置的路由，一般放置在router文件夹中

5.2: 总结
路由组件与非路由组件的区别：
  1：路由组件一般放在pages|views文件夹中，非路由组件一般放在components文件夹中
  2：路由组件一般需要在router文件夹中进行注册，使用的即为组件的名字，非路由组件一般都是以标签的形式使用
  3：在vue中，注册完路由，不管是路由组件还是非路由组件身上都有$route和$router属性

$route:一般用于获取路由信息【路径、query参数、params参数等等】
$router:一般进行编程式路由导航（路由跳转）【push|replace】

5.3: 路由的跳转
路由的跳转有两种形式：
  声明式路由导航`<router-link></router-link>`,可以进行路由的跳转；
  编程式路由导航push|replace,可以进行路由的跳转
编程式路由导航：声明式导航能做的，编程式导航都能做，但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑。

6: Footer组件的显示与隐藏
显示或隐藏组件：v-if|v-show
Footer组件：在Home、Search中是显示的，但是在Login、Register中是隐藏的。

6.1: 我们可以根据组件this上的$route获取当前路由的信息，通过路由的路径去判断Footer的显示与隐藏。
6.2: 我们在配置路由的时候可以给路由添加路由元信息【meta】，路由需要的是配置对象，所以key不能乱写。

7: 路由传参

7.1: 路由的跳转有几种方式？
1 声明式路由导航 router-link 务必要有to属性，可以实现路由跳转
2 编程式路由导航 利用的是组件实例的$router.push|replace方法，可以实现路由的跳转（可以书写一些自己的业务）

7.2: 路由传参，参数有几种写法？
1 params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
2 query参数： 不属于路径当中的一部分，类似于ajax中的queryString /home?key=value&a=15,配置路由时不需要站位

8: 编程式路由导航跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误
声明式不会出现这种问题，因为Vue-router的底层已经处理了
8.1: 为什么编程式导航进行路由跳转的时候，就会出现这种警告错误呢？
"vue-router":"^3.6.5":现在已经引入了promise，push|replace方法的返回值是Promise，传入的另外两个参数是成功和失败的回调
8.2: 通过catch方法捕捉到push|replace方法报出的错误，这样在控制台就不会报错了；或者给push|replace方法传入成功和失败了回调。
8.3: 通过修改vue源码，来防止使用$router.push|replace产生报错
VueRouter.prototype.push = $router.`__proto__`.push 所以我们可以在路由器（router/index.js）重写push|replace

