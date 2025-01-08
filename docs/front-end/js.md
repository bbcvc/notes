---
outline: deep
---
# JavaScript

### 1. ES5 和 ES6 继承方式区别

- ES5 定义类以函数形式, 以 prototype 来实现继承
- ES6 以 class 形式定义类, 以 extend 形式继承

### 2. [Generator 了解](http://es6.ruanyifeng.com/#docs/generator)

ES6 提供的一种异步编程解决方案, Generator 函数是一个状态机，封装了多个内部状态。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

调用后返回指向内部状态的指针, 调用 next()才会移向下一个状态, 参数:

```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

### 3. 手写 Promise 实现

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 初始状态
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.onFulfilledCallbacks = []; // 成功的回调
    this.onRejectedCallbacks = []; // 失败的回调

    const resolve = (value) => {
      // 状态只能从 pending 改变，且一旦改变不可再变
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // 执行所有成功的回调
        this.onFulfilledCallbacks.forEach((callback) => callback());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        // 执行所有失败的回调
        this.onRejectedCallbacks.forEach((callback) => callback());
      }
    };

    try {
      executor(resolve, reject); // 执行传入的 executor
    } catch (error) {
      reject(error); // 如果出错，则直接执行 reject
    }
  }

  then(onFulfilled, onRejected) {
    // 支持链式调用，返回一个新的 Promise
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 保证异步执行
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === 'pending') {
        // 如果是 pending 状态，保存回调
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onRejected(this.reason);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
  }
}

myPromise.then((value) => {
  // 成功后调用, 使用value值
}, (error) => {
  // 失败后调用, 获取错误信息error
})
```

### 4. Promise 优缺点

- 优点: 解决回调地狱, 对异步任务写法更标准化与简洁化
- 缺点: 首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消; 其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部; 第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成).
  极简版 promise 封装:

```js
function promise () {
  this.msg = '' // 存放value和error
  this.status = 'pending'
  var that = this
  var process = arguments[0]

  process (function () {
    that.status = 'fulfilled'
    that.msg = arguments[0]
  }, function () {
    that.status = 'rejected'
    that.msg = arguments[0]
  })
  return this
}

promise.prototype.then = function () {
  if (this.status === 'fulfilled') {
    arguments[0](this.msg)
  } else if (this.status === 'rejected' && arguments[1]) {
    arguments[1](this.msg)
  }
}
```

### 5. [观察者模式](https://www.cnblogs.com/gradolabs/p/4786782.html)

又称发布-订阅模式, 举例子说明.
实现: 发布者管理订阅者队列, 并有新消息推送功能. 订阅者仅关注更新就行

### 6. 手写实现 bind

```js
Function.prototype.bind = function () {
   // 保存原函数
  var self = this
  // 取出第一个参数作为上下文, 相当于[].shift.call(arguments)
  var context = Array.prototype.shift.call(arguments)
  // 取剩余的参数作为arg; 因为arguments是伪数组, 所以要转化为数组才能使用数组方法
  var arg = Array.prototype.slice.call(arguments)
  // 返回一个新函数
  return function () {
    // 绑定上下文并传参
    self.apply(context, Array.prototype.concat.call(arg, Array.prototype.slice.call(arguments)))
  }
}
```

### 7. [手写实现 4 种继承](https://www.jianshu.com/p/159b07f2d877)

```js
function Father () {}
function Child () {}
// 1. 原型继承
Child.prototype = new Father()
// 2. 构造继承
function Child (name) {
  Father.call(this, name)
}
// 3. 组合继承
function Child (name) {
  Father.call(this, name)
}
Child.prototype = new Father()
// 4. 寄生继承
function cloneObj (o) {
  var clone = object.create(o)
  clone.sayName = ...
  return clone
}
// 5. 寄生组合继承
// 6. ES6 class extend继承
```

### 9. http 状态码

- 1\*\*: 服务器收到请求, 需请求者进一步操作
- 2\*\*: 请求成功
- 3\*\*: 重定向, 资源被转移到其他 URL 了
- 4\*\*: 客户端错误, 请求语法错误或没有找到相应资源
- 5\*\*: 服务端错误, server error
- 304: Not Modified. 指定日期后未修改, 不返回资源

### 10. Object.create 实现（原型式继承，特点：实例的**proto**指向构造函数本身）

### 11. async 和 await：(ES8)

- Generator 函数的语法糖，将\*改成 async，将 yield 换成 await。
- 是对 Generator 函数的改进, 返回 promise。
- 异步写法同步化，遇到 await 先返回，执行完异步再执行接下来的.
- 内置执行器, 无需 next()

### 12. 算法和数据结构：

- 算法：
  解决具体问题所需要的解决方法。执行效率最快的最优算法。时间复杂度。输入，输出，有穷性，确定性，可行性。冒泡排序，二叉树遍历，最长回文，二分查找，指针，链表等，堆栈，队列等。力扣，codewar，算法导论。
- 数据结构：
  逻辑结构：集合、线性、树形、图形结构
  物理结构：顺序、链式存储结构

### 13. 封装 JSONP

```js
function jsonp ({url, param, callback}) {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script')
    window.callback = function (data) {
      resolve(data)
      document.body.removeChild('script')
    }
    var param = {...param, callback}
    var arr = []
    for (let key in param) {
      arr.push(`${key}=${param[key]}`)
    }
    script.src = `${url}?${arr.join('&')}`
    document.body.appendChild(script)
  })
}
```

### 14. 手动实现 map(forEach 以及 filter 也类似)

```js
// for循环实现
Array.prototype.myMap = function () {
  var arr = this
  var [fn, thisValue] = Array.prototype.slice.call(arguments)
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result.push(fn.call(thisValue, arr[i], i, arr))
  }
  return result
}
var arr0 = [1, 2, 3]
console.log(arr0.myMap(v => v + 1))

// forEach实现(reduce类似)
Array.prototype.myMap = function (fn, thisValue) {
  var result = []
  this.forEach((v, i, arr) => {
    result.push(fn.call(thisValue, v, i, arr))
  })
  return result
}
var arr0 = [1, 2, 3]
console.log(arr0.myMap(v => v + 1))
```

### 15. js 实现 checkbox 全选以及反选

```html
<body>
    <button id="other">反选</button>
    <input type="checkbox" id="all" />全选
    <input type="checkbox" class="check" />1
    <input type="checkbox" class="check" />2
    <input type="checkbox" class="check" />3
    <script>
      var checkbox = document.getElementsByClassName('check')
      var checkAll = document.getElementById('all')
      var checkOther = document.getElementById('other')
      checkAll.onclick = function() {
        var flag = true
        for (var i = 0; i < checkbox.length; i++) {
          if (!checkbox[i].checked) flag = false
        }
        if (flag) {
          for (var i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false
          }
        } else {
          for (var i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = true
          }
        }
      }
      checkOther.onclick = function() {
        for (var i = 0; i < checkbox.length; i++) {
          checkbox[i].checked = !checkbox[i].checked
        }
      }
    </script>
  </body>
```

### 16. [对原型链的理解](https://www.jianshu.com/p/17b2d4dd6867)？prototype 上都有哪些属性

- 在 js 里，继承机制是原型继承。继承的起点是 对象的原型（Object prototype）。
- 一切皆为对象，只要是对象，就会有 proto 属性，该属性存储了指向其构造的指针。
- Object prototype 也是对象，其 proto 指向 null。
- 对象分为两种：函数对象和普通对象，只有函数对象拥有『原型』对象（prototype）。
- prototype 的本质是普通对象。
- Function prototype 比较特殊，是没有 prototype 的函数对象。
- new 操作得到的对象是普通对象。
- 当调取一个对象的属性时，会先在本身查找，若无，就根据 proto 找到构造原型，若无，继续往上找。最后会到达顶层 Object prototype，它的 proto 指向 null，均无结果则返回 undefined，结束。
- 由 proto 串起的路径就是『原型链』。
- 通过 prototype 可以给所有子类共享属性
- 函数（Function）才有 prototype 属性，对象（除 Object）拥有**proto**
- 实例的**proto**等于构造函数的 prototype
- 实例的 constructor 指向构造函数

### 17. 为什么使用继承

通常在一般的项目里不需要,因为应用简单,但你要用纯 js 做一些复杂的工具或框架系统就要用到了,比如 webgis、或者 js 框架如 jquery、ext 什么的,不然一个几千行代码的框架不用继承得写几万行,甚至还无法维护

### 18. setTimeout 时间延迟为何不准

单线程, 先执行同步主线程, 再执行异步任务队列

### 19. [事件循环述，宏任务和微任务有什么区别？](https://www.jianshu.com/p/03b89adb3ddd)

- 先主线程后异步任务队列
- 先微任务再宏任务

### 20. let const var 作用域

块级作用域, 暂时性死区

### 21. [节流和防抖](https://www.cnblogs.com/walls/p/6399837.html)

- 函数节流是指一定时间内 js 方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释。

```js
// 函数节流   滚动条滚动
var canRun = true;
document.getElementById("throttle").onscroll = function(){
    if(!canRun){
        // 判断是否已空闲，如果在执行中，则直接return
        return;
    }

    canRun = false;
    setTimeout(function(){
        console.log("函数节流");
        canRun = true;
    }, 300);
};
```

- 函数防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。

```js
// 函数防抖
var timer = false;
document.getElementById("debounce").onscroll = function(){
    clearTimeout(timer); // 清除未执行的代码，重置回初始化状态

    timer = setTimeout(function(){
        console.log("函数防抖");
    }, 300);
};
```

### 22. 实现一个 sleep 函数

```js
// 这种实现方式是利用一个伪死循环阻塞主线程。因为JS是单线程的。所以通过这种方式可以实现真正意义上的sleep()。
function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}

function test() {
  console.log('111');
  sleep(2000);
  console.log('222');
}

test()
```

### 23. 闭包

- 概念: 内层函数能够访问外层函数作用域的变量
- 缺点: 引起内存泄漏（释放内存）
- 作用:
  - 保护 this 指向
  - 使用闭包修正打印值
  - 实现柯里化
  - 实现 node commonJs 模块化, 实现私有变量
  - 保持变量与函数活性, 可延迟回收和执行

### 24. [Immutable.js](https://www.jianshu.com/p/0fa8c7456c15)

Facebook 出品, 倡导数据的不可变性, 用的最多就是 List 和 Map.

### 25. js 实现 instanceof

```js
// 检测l的原型链（__proto__）上是否有r.prototype，若有返回true，否则false
function myInstanceof (l, r) {
  var R = r.prototype
  while (l.__proto__) {
    if (l.__proto__ === R) return true
  }
  return false
}
```

### 27. [ES6 的模块引入和 CommonJs 区别](https://www.cnblogs.com/unclekeith/archive/2017/10/17/7679503.html)

### 28. [严格模式](https://www.jianshu.com/p/39e295f4526d)

```js
// 严格模式下, 隐式绑定丢失后this不会指向window, 而是指向undefined
      'use strict'
      var a = 2
      var obj = {
        a: 1,
        b: function() {
          // console.log(this.a)
          console.log(this)
        }
      }
      var c = obj.b
      c() // undefined
```

### 30. typescript 缺点

- 并不是严格意义的 js 的超集, 与 js 不完全兼容, 会报错
- 更多的限制, 是一种桎梏
- 有些 js 第三方库没有 dts, 有问题

### 31. 构造函数实现原理（new 操作符做了什么）

- 构造函数中没有显示的创建 Object 对象, 实际上后台自动创建了一个空对象
- 直接给 this 对象赋值属性和方法, this 即指向创建的对象
- 没有 return 返回值, 后台自动返回了该对象
- 该对象继承构造函数的原型

```js
// 模拟构造函数实现
var Book = function(name) {
  this.name = name;
};

//正常用法
var java = new Book(‘Master Java’);

//使用代码模拟，在非IE浏览器中测试，IE浏览器不支持
var python = {};
python.__proto__ = Book.prototype;
Book.call(python, 'Master Python');
```

### 32. [for in 和 for of 区别](https://www.jianshu.com/p/c43f418d6bf0)

- `for in`遍历数组会遍历到数组原型上的属性和方法, 更适合遍历对象
- `forEach`不支持`break, continue, return`等
- 使用`for of`可以成功遍历数组的值, 而不是索引, 不会遍历原型
- for in 可以遍历到 myObject 的原型方法 method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery 方法可以判断某属性是否是该对象的实例属性

### 33. JS 实现并发控制:

使用消息队列以及`setInterval`或`promise`进行入队和出队

### 34. [ajax 和 axios、fetch 的区别](https://www.jianshu.com/p/8bc48f8fde75)

### 35. promise.finally 实现

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

### 36. [实现 symbol](https://segmentfault.com/a/1190000015262174)

```js
(function() {
    var root = this;
    var SymbolPolyfill = function Symbol(description) {
        // Symbol函数前不能使用new命令
        if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor')
        // 参数是对象，则调用toString
        var descString = description === undefined ? undefined : String(description)
        var symbol = Object.create({
            // 显示转为字符串
            toString: function() {
                return 'Symbol(' + this.description ')'
            },
            // 不能参与运算
            valueOf: function() {
                throw new Error('Cannot convert a Symbol value')
            }
        })
        // 作为对象键名时，生成一个独一无二名称
        // ES2019新增
        symbol.prototype.description = descString
        // 返回一个新对象 由于指针不同  所以两两不等
        return symbol;
    }
    root.SymbolPolyfill = SymbolPolyfill;
})();
```

[Object.create()创建对象](https://www.jianshu.com/p/28d85bebe599)

### 37. ES6 装饰器

- 提案经过大幅修改，没有定案，可能会变
- 是一种函数，用于改变类或方法的功能，起到注释作用
- 函数：

```js
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```

- 方法：

```js
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

- 先从外到内进入，经过 reverse 倒序后，然后由内向外执行。

### 38. 实现 fetch abort

```js
const controller = new AbortController()
setTimeout(() => controller.abort(), 1000);

fetch(url, {
    signal: controller.signal
}).then(res => {
    ...
}, err => {
    console.log(err) // AbortError
})
```

### 39. 使用 xhr 实现 fetch

- fetch 是 ajax 替代品，基于 promise。
- 类似于 jquey ajax，但不是 ajax 封装，而是原生 js,，没有使用 XHR 对象
- 比 ajax 方便，但仍然不完善，建议使用 axios 库

- 用 XHR 实现 fetch:
```js
// 先实现ajax
function ajax(method,url,data,suc,fail) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                suc(xhr.responseText)
            } else {
                console.log(err);
                fail(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

// 再实现promise
function promise () {
  this.msg = '' // 存放value和error
  this.status = 'pending'
  var that = this
  var process = arguments[0]

  process (function () {
    that.status = 'fulfilled'
    that.msg = arguments[0]
  }, function () {
    that.status = 'rejected'
    that.msg = arguments[0]
  })
  return this
}

promise.prototype.then = function () {
  if (this.status === 'fulfilled') {
    arguments[0](this.msg)
  } else if (this.status === 'rejected' && arguments[1]) {
    arguments[1](this.msg)
  }
}

// 最后实现fetch
function fetch(method, url, data) {
    return new promise(function (resolve,reject) {
        ajax(method, url, data, function (res) {
            resolve(res);
        },function (err) {
            reject(err);
        })
    })
}
```

### 40. JS 中数值存储

- javascript 中所有的数值类型都是双精度存储的，使用 **64bit**，64bit 等于 **8byte**
- 中文占 2 个字节（byte） 中文里标点也占 2 个字节（byte） 英文里的子母不分大小写，一个子母占 1 个字节（字节） 英文里的标点占 1 个字节。 1 字节（byte）=8 位（bits）
- 当任何数字在进行位运算时 js 内部会将其转换成 32 位有符号整型

### 41. [this 指向](https://juejin.im/post/5c049e6de51d45471745eb98)

- 谁调用了方法，该方法的 this 就指向谁;
- 优先级：箭头函数 > new 绑定 > 显示绑定 > 隐式绑定
