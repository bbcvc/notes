---
outline: deep
---

# Vue 3

### Vue 3 的主要特性是什么？
Vue 3 的主要特性包括：
- Composition API
- Teleport
- Fragments
- Improved TypeScript support
- Better performance
- New reactivity system

### 什么是 Composition API？
Composition API 是 Vue 3 引入的一种新的 API，用于更灵活和可重用地组织组件逻辑。它通过 `setup` 函数来定义组件的逻辑，允许开发者将相关的代码片段组合在一起。

### Vue 3 中的 Teleport 是什么？
Teleport 是 Vue 3 中的新特性，允许你将组件的 DOM 节点渲染到指定的目标元素中，而不是其父组件的 DOM 树中。这对于模态框、弹出框等需要在特定位置渲染的组件非常有用。

### Vue 3 如何提高性能？
Vue 3 通过以下方式提高性能：
- 更快的虚拟 DOM diff 算法
- 编译时优化
- 更小的打包体积
- 更高效的响应式系统

### Vue 3 如何支持 TypeScript？
Vue 3 对 TypeScript 的支持更加完善，提供了更好的类型推断和类型检查。Vue 3 的 Composition API 设计也使得与 TypeScript 的集成更加自然和高效。

### Vue 3 中的响应式系统有什么变化？
Vue 3 引入了基于 Proxy 的新的响应式系统，替代了 Vue 2 中的基于 `Object.defineProperty` 的实现。新的响应式系统更高效，支持更多类型的数据结构，并且解决了 Vue 2 中的一些限制和问题。

### Vue 3 中的 Composition API 与 Options API 有什么区别？
Composition API 是 Vue 3 中引入的新的 API，与 Vue 2 中的 Options API 相比，它有以下优点：
- 更灵活和可重用的组织组件逻辑
- 更好的 TypeScript 支持
- 更容易共享和复用逻辑代码
- 更好的代码组织和维护性

### Vue 3 中的 Teleport 和 Portals 有什么区别？
Teleport 是 Vue 3 中的新特性，类似于 React 中的 Portals，用于将组件的 DOM 节点渲染到指定的目标元素中。Teleport 允许你在组件的模板中指定一个目标元素，将组件的内容渲染到该目标元素中，而不是其父组件的 DOM 树中。

### setup 函数在 Vue 3 中的作用是什么？
`setup` 函数是 Vue 3 中的一个新特性，用于定义组件的逻辑。`setup` 函数接收 `props` 和 `context` 作为参数，返回一个对象，包含组件的状态和方法。`setup` 函数可以用来定义组件的响应式数据、计算属性、方法等。

### vue3的响应式系统是如何实现的？
Vue 3 中的响应式系统是通过 Proxy 实现的。Proxy 是 ES6 中的一个新特性，可以拦截对象的各种操作，包括属性的读取、设置、删除等。Vue 3 使用 Proxy 来监听对象的变化，从而实现响应式更新。
Vue 3 中的 diff 算法是通过 Proxy 实现的，它比 Vue 2 中的基于 `Object.defineProperty` 的实现更高效和灵活。Proxy 可以拦截对象的各种操作，包括属性的读取、设置、删除等，从而实现更细粒度的响应式更新。

### watchEffect 和 watch 的区别是什么？
`watchEffect` 和 `watch` 都是 Vue 3 中用于监听数据变化的 API，它们的区别在于：
- `watchEffect` 是一个立即执行的监听器，它会立即执行一次回调函数，并在依赖的数据变化时重新执行回调函数。
- `watch` 是一个惰性执行的监听器，它需要显式地指定要监听的数据，并在数据变化时执行回调函数。
