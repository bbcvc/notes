---
outline: deep
---

# react 相关

### 1. [新旧生命周期](https://segmentfault.com/a/1190000016617400)

- **旧**: will, did; mount, update...
- **新**: 16 版本之后:
  - `getDerivedStateFromProps`: 虚拟 dom 之后，实际 dom 挂载之前, 每次获取新的 props 或 state 之后, 返回新的 state, 配合 didUpdate 可以替代 willReceiveProps
  - `getSnapshotBeforeUpdate`: update 发生的时候，组件更新前触发, 在 render 之后，在组件 dom 渲染之前；返回一个值，作为 componentDidUpdate 的第三个参数；配合 componentDidUpdate, 可以覆盖 componentWillUpdate 的所有用法
  - `componentDidCatch`: 错误处理
- **对比**: 弃用了三个 will, 新增两个 get 来代替 will, 不能混用, 17 版本会彻底删除. 新增错误处理

### 2. react 核心

- [虚拟 DOM, Diff 算法, 遍历 key 值](http://www.cnblogs.com/mahmud/p/10099672.html)
- react-dom: 提供了针对 DOM 的方法，比如：把创建的虚拟 DOM，渲染到页面上 或 配合 ref 来操作 DOM
- react-router

### 3. fiber 核心(react 16)

- 旧: 浏览器渲染引擎单线程, 计算 DOM 树时锁住整个线程, 所有行为同步发生, 有效率问题, 期间 react 会一直占用浏览器主线程，如果组件层级比较深，相应的堆栈也会很深，长时间占用浏览器主线程, 任何其他的操作（包括用户的点击，鼠标移动等操作）都无法执行
- 新: 重写底层算法逻辑, 引入 fiber 时间片, 异步渲染, react 会在渲染一部分树后检查是否有更高优先级的任务需要处理(如用户操作或绘图), 处理完后再继续渲染, 并可以更新优先级, 以此管理渲染任务. 加入 fiber 的 react 将组件更新分为两个时期（phase 1 && phase 2），render 前的生命周期为 phase1，render 后的生命周期为 phase2, 1 可以打断, 2 不能打断一次性更新. 三个 will 生命周期可能会重复执行, 尽量避免使用

### 4. 渲染一个 react

- 分为首次渲染和更新渲染
- 生命周期, 建立虚拟 DOM, 进行 diff 算法
- 对比新旧 DOM, 节点对比, 将算法复杂度从 O(n^3)降低到 O(n)
- key 值优化, 避免用 index 作为 key 值, 兄弟节点中唯一就行

### 5. 高阶组件

高阶组件就是一个函数，且该函数(wrapper)接受一个组件作为参数，并返回一个新的组件。
高阶组件并不关心数据使用的方式和原因，而被包裹的组件也不关心数据来自何处.

- [react-dnd](https://segmentfault.com/a/1190000004006185?_ea=457266): 根组件, source, target 等
  `export default DragSource(type, spec, collect)(MyComponent)`
- 重构代码库使用 HOC 提升开发效率

### 6. hook(v16.7 测试)

在无状态组件(如函数式组件)中也能操作 state 以及其他 react 特性, 通过 useState

### 7. redux 和 vuex 以及 dva

- redux: 通过 store 存储，通过 action 唯一更改，reducer 描述如何更改。dispatch 一个 action
- dva: 基于 redux，结合 redux-saga 等中间件进行封装
- vuex：类似 dva，集成化。action 异步，mutation 非异步

### 8. [react 和 vue 的区别](https://www.jianshu.com/p/b7cd52868e95?from=groupmessage)

- **数据是否可变**: react 整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在 react 中，是单向数据流，推崇结合 immutable 来实现数据不可变; vue 的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立 Watcher 来监听，当属性变化的时候，响应式的更新对应的虚拟 dom。总之，react 的性能优化需要手动去做，而 vue 的性能优化是自动的，但是 vue 的响应式机制也有问题，就是当 state 特别多的时候，Watcher 也会很多，会导致卡顿，所以大型应用（状态特别多的）一般用 react，更加可控。
- **通过 js 来操作一切，还是用各自的处理方式**: react 的思路是 all in js，通过 js 来生成 html，所以设计了 jsx，还有通过 js 来操作 css，社区的 styled-component、jss 等; vue 是把 html，css，js 组合到一起，用各自的处理方式，vue 有单文件组件，可以把 html、css、js 写到一个文件中，html 提供了模板引擎来处理。
- **类式的组件写法，还是声明式的写法**: react 是类式的写法，api 很少; 而 vue 是声明式的写法，通过传入各种 options，api 和参数都很多。所以 react 结合 typescript 更容易一起写，vue 稍微复杂。
- **扩展不同**: react 可以通过高阶组件（Higher Order Components--HOC）来扩展，而 vue 需要通过 mixins 来扩展
- **什么功能内置，什么交给社区去做**: react 做的事情很少，很多都交给社区去做，vue 很多东西都是内置的，写起来确实方便一些，
  比如 redux 的 combineReducer 就对应 vuex 的 modules，
  比如 reselect 就对应 vuex 的 getter 和 vue 组件的 computed，
  vuex 的 mutation 是直接改变的原始数据，而 redux 的 reducer 是返回一个全新的 state，所以 redux 结合 immutable 来优化性能，vue 不需要。

### 9. react 单向数据流怎么理解

React 是单向数据流，数据主要从父节点传递到子节点（通过 props）。如果顶层（父级）的某个 props 改变了，React 会重渲染所有的子节点。

### 10. React 算法复杂度优化

react 树对比是按照层级去对比的， 他会给树编号 0,1,2,3,4.... 然后相同的编号进行比较。 所以复杂度是 n，这个好理解。

关键是传统 diff 的复杂度是怎么算的？ 传统的 diff 需要出了上面的比较之外，还需要跨级比较。 他会将两个树的节点，两两比较，这就有 n^2 的复杂度了。 然后还需要编辑树，编辑的树可能发生在任何节点，需要对树进行再一次遍历操作，因此复杂度为 n。加起来就是 n^3 了。

### 11. React 优点

声明式, 组件化, 一次学习, 随处编写. 灵活, 丰富, 轻巧, 高效

### 12. React 事件机制

- 合成事件：
  - 根据事件类型，采用不同的`SyntheticEvent`来构造不同的合成事件
  - `syntheticEvent` 和原生浏览器事件一样拥有同样的接口，也支持事件冒泡机制。可以通过`stopPropgation`和`preventDefault`中断
  - 如果需要访问原生事件对象，可以使用`nativeEvent`属性
- 实现机制：
  - react 的事件机制利用了事件委托机制
  - 没有绑定在真实的 dom 节点上，而是把事件都绑定在结构的最外层 document，统一由这个监听器分发
  - 注册：组件挂载和更新时，将绑定事件分类放入`EventPluginHub`事件池
  - 触发：根据事件产生的 Event 对象找到触发事件的组件，再通过组件标识和事件类型从事件池里找到对应的事件监听回调并执行
- react 中使用原生
  - 在`didmount`中对真实 dom 进行原生绑定，在`unmount`解绑，防止内存泄漏
  - `syntheticEvent`的`stopPropgation`无法阻止原生事件的冒泡，但原生可以组织合成，所以尽量不要混用，除非使用 e.target 判断
- 异步回调使用`syntheticEvent`：
  - 合成事件里，回调执行后会销毁事件对象
  - 异步回调需使用`event.persist()`告诉 react 不要回收
- 与原生冒泡捕获对比：
  - 原生的捕获机制并不常用，且具有 ie 的不兼容问题
  - react 仅实现冒泡机制，无兼容问题，只有`document`节点上才有 DOM 事件也节约了内存
- 事件执行：
  1. 找到事件触发的`DOM`和`React Component`，调用`findParent`方法
  2. 遍历得到所有父组件，存在数组中
  3. 从该组件直到最后一个父组件，根据之前事件存储，用 React 事件名 + 组件 key，找到对应绑定回调方法

