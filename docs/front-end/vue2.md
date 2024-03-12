---
outline: deep
---

# vue2.x

### 1.[ 生命周期](http://baijiahao.baidu.com/s?id=1603406094025961442&wfr=spider&for=pc)

### 2 .双向数据绑定 v-model。这个最好也是自己实现一下 理解更深

通过 v-model
VUE 实现双向数据绑定的原理就是利用了 Object.defineProperty() 这个方法重新定义了对象获取属性值(get)和设置属性值(set)的操作来实现的。

```
// 依赖收集
// 简化版
var obj = { }
var name
//第一个参数：定义属性的对象。
//第二个参数：要定义或修改的属性的名称。
//第三个参数：将被定义或修改的属性描述符。
Object.defineProperty(obj, "data", {
  //获取值
  get: function () {
    return name
  },
  //设置值
  set: function (val) {
    name = val
    console.log(val)
  }
})
//赋值调用set
obj.data = 'aaa'
//取值调用get
console.log(obj.data)

// 详细版
 myVue.prototype._obverse = function (obj) { // obj = {number: 0}
    var value;
    for (key in obj) {  //遍历obj对象
      if (obj.hasOwnProperty(key)) {
        value = obj[key];
        if (typeof value === 'object') {  //如果值是对象，则递归处理
          this._obverse(value);
        }
        Object.defineProperty(this.$data, key, {  //关键
          enumerable: true,
          configurable: true,
          get: function () {
            console.log(`获取${value}`);
            return value;
          },
          set: function (newVal) {
            console.log(`更新${newVal}`);
            if (value !== newVal) {
              value = newVal;
            }
          }
        })
      }
    }
  }
```

### 3.vue 父子组件传递参数

- 父 -->子: 通过 props
- 子 -->父: 通过 $$refs 或 $emit

### 4.[vue 传递参数方法](https://www.imooc.com/article/257885)

- 父子组件传参如上, v-bind : v-on @
- 兄弟组件传参:(通过 EventBus 事件总线实现)

```
// 1. 新建eventBus.js
import Vue from 'vue'
export default new Vue
// 或直接在main.js中初始化EventBus(全局)
Vue.prototype.$EventBus = new Vue()

// 2. 发射与接收
// 如果是定义在eventBus.js中
import eventBus from 'eventBus.js'
eventBus.$emit()
eventBus.$on()

// 如果是定义在main.js中
this.bus.$emit()
this.bus.$on()

// 3. 移除监听
eventBus.$off()
```

### 5.vue 自定义组件

可以使用独立可复用的自定义组件来构成大型应用, 采用帕斯卡命名法或横线连接, 通过以上方式进行组件间通信. 每一个组件都是 Vue 实例, 可以使用生命周期钩子.

### 6. [vue 自定义指令](http://baijiahao.baidu.com/s?id=1603883371090691442&wfr=spider&for=pc)

- 除核心指令之外的指令, 使用 directive 进行注册.
- 指令自定义钩子函数: bind, inserted, update, componentUpdated, unbind

### 7.[vuex 组成和原理](https://baijiahao.baidu.com/s?id=1618794879569468435&wfr=spider&for=pc)

- 组成: 组件间通信, 通过 store 实现全局存取
- 修改: 唯一途径, 通过 commit 一个 mutations(同步)或 dispatch 一个 actions(异步)
- 简写: 引入 mapState、mapGetters、mapActions

### 8.vue-router 的原理，例如 hashhistory 和 History interface 这些东西要弄明白。其实看一下源码就好了，看不懂可以直接看解析的相关技术博客。

- [vue-router 用法](https://www.jianshu.com/p/e8b2529e472c):
  在 router.js 或者某一个路由分发页面配置 path, name, component 对应关系
  - 每个按钮一个 value, 在 watch 功能中使用 this.$router.push 实现对应跳转, 类似 react 的 this.history.push
  - 或直接用 router-link to 去跳转, 类似 react 的 link to
- [vue-router 原理](https://www.jianshu.com/p/4295aec31302): 通过**hash**和**History interface**两种方式实现前端路由
  - HashHistory: 利用 URL 中的 hash（“#”）;replace()方法与 push()方法不同之处在于，它并不是将新路由添加到浏览器访问历史的栈顶，而是替换掉当前的路由
  - History interface: 是浏览器历史记录栈提供的接口，通过 back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作. pushState(), replaceState() 这下不仅是读取了，还可以对浏览器历史记录栈进行修改

### 9.vue 的 seo 问题

seo 关系到网站排名, vue 搭建 spa 做前后端分离不好做 seo, 可通过其他方法解决:

- [SSR 服务端渲染](https://ssr.vuejs.org/zh/#%E4%BB%80%E4%B9%88%E6%98%AF%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93-ssr-%EF%BC%9F): 将同一个组件渲染为服务器端的 HTML 字符串.利于 seo 且更快.
- vue-meta-info, nuxt, prerender-spa-plugin 页面预渲染等

### 10.预渲染和 ssr

以上

### 11.生命周期内 create 和 mounted 的区别

- **created**: 在模板渲染成 html 前调用，即通常初始化某些数据，然后再渲染成视图。
- **mounted**: 在模板渲染成 html 后调用，通常是初始化页面完成后，再对 html 的 dom 节点进行一些需要的操作和方法。

### 12.监听 watch

对应一个对象，键是观察表达式，值是对应回调。值也可以是 methods 的方法名，或者是对象，包含选项。在实例化时为每个键调用 $watch()

### 13.登录验证拦截(通过 router)

- 先设置 requireAuth:

```
routes = [
    {
        name: 'detail',
        path: '/detail',
        meta: {
            requireAuth: true
        }
    },
    {
        name: 'login',
        path: '/login'
    }
]
```

- 再配置 router.beforeEach:

```
router.beforeEach((from, to, next) => {
    if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
        if (store.state.token) { // vuex.state判断token是否存在
            next() // 已登录
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
       next()
    }
})
```

### 14. v-for key 值

不写 key 值会报 warning, 和 react 的 array 渲染类似. 根据 diff 算法, 修改数组后, 写 key 值会复用, 不写会重新生成, 造成性能浪费或某些不必要的错误

### 15. [vue3.0 的更新和 defineProperty 优化](https://www.oschina.net/news/101906/vue-3-0-updates?from=singlemessage)

- 放弃 Object.defineProperty ，使用更快的原生 Proxy (访问对象拦截器, 也称代理器)
- 提速, 降低内存使用, Tree-shaking 更友好
- 支持 IE11 等
- 使用 Typescript

### 15. vue 使用 this 获取变量

正常要通过 vm.$options.data访问，但实例vm会遍历data中的变量，并挂在到this上， this.$root 传参取值

### 16. [jQuery 的优缺点，与 vue 的不同，vue 的优缺点？](https://www.jianshu.com/p/131c0d04dc1b)

- jq 优点: 比原生 js 更易书写, 封装了很多 api, 有丰富的插件库; 缺点: 每次升级与之前版本不兼容, 只能手动开发, 操作 DOM 很慢, 不方便, 变量名污染, 作用域混淆等.
- vue 优缺点: 双向绑定, 虚拟 DOM, diff 算法, MVVM, 组件化, 通信方便, 路由分发等

### 17. vue 解除双向绑定

`let obj = JSON.parse(JSON.stringify(this.temp1));`

### 18. vue 异步组件

为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染

```
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

### 19. [MVC 与 MVVM](http://baijiahao.baidu.com/s?id=1596277899370862119&wfr=spider&for=pc)

- model-数据层 view-视图层 controller-控制层
- MVC 的目的是实现 M 和 V 的分离，单向通信，必须通过 C 来承上启下
- MVVM 中通过 VM（vue 中的实例化对象）的发布者-订阅者模式实现双向绑定，数据绑定，dom 事件监听
- 区别：MVC 和 MVVM 的区别并不是 VM 完全取代了 C，ViewModel 存在目的在于抽离 Controller 中展示的业务逻辑，而不是替代 Controller，其它视图操作业务等还是应该放在 Controller 中实现。也就是说 MVVM 实现的是业务逻辑组件的重用

### 20. vue 渐进式

小到可以只使用核心功能，比如单文件组件作为一部分嵌入；大到使用整个工程，vue init webpack my-project 来构建项目；VUE 的核心库及其生态系统也可以满足你的各式需求（core+vuex+vue-route）
