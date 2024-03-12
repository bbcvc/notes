---
outline: deep
---
#  浏览器网络相关
### 1. [reflow(回流)和 repaint(重绘)优化](https://www.jianshu.com/p/40c6fc1d4800)

- 浏览器渲染过程: DOM tree, CSS tree --> Render tree --> Paint
- DOM tree 根节点为 html
- 渲染从浏览器左上角到右下角
- 第一次打开页面至少触发一次重绘和回流, 结构如宽高位置变化时, 触发**reflow 回流**;非结构如背景色变化时, 触发**repaint 重绘**. 二者都会造成体验不佳
- 如何减少重绘和回流?
  - 通过 classname 或 cssText 一次性修改样式, 而非一个一个改
  - 离线模式: 克隆要操作的结点, 操作后再与原始结点交换, 类似于虚拟 DOM
  - 避免频繁直接访问计算后的样式, 而是先将信息保存下来
  - 绝对布局的 DOM, 不会造成大量 reflow
  - div 不要嵌套太深, 不要超过六层

### 2.[一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？](https://www.cnblogs.com/gitbo/p/6597735.html)

- 浏览器根据请求的 URL 交给 DNS 域名解析，找到真实 IP，向服务器发起请求；
- 服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
- 浏览器对加载到的资源（HTML、JS、CSS 等）进行语法解析，建立相应的内部数据结构（如 HTML 的 DOM Tree）；
- 载入解析到的资源文件，渲染页面，完成。

### 3.localStorage 与 sessionStorage 与 cookie 的区别总结

- **共同点**: 都保存在浏览器端, 且同源
- localStorage 与 sessionStorage 统称 webStorage,保存在浏览器,不参与服务器通信,大小为 5M
- **生命周期不同**: localStorage 永久保存, sessionStorage 当前会话, 都可手动清除
- **作用域不同**: 不同浏览器不共享 local 和 session, 不同会话不共享 session
- **Cookie**: 设置的过期时间前一直有效, 大小 4K.有个数限制, 各浏览器不同, 一般为 20 个.携带在 HTTP 头中, 过多会有性能问题.可自己封装, 也可用原生

### 4.浏览器如何阻止事件传播，阻止默认行为

- 阻止事件传播(冒泡): e.stopPropagation()
- 阻止默认行为: e.preventDefault()

### 5.虚拟 DOM 方案相对原生 DOM 操作有什么优点，实现上是什么原理？

虚拟 DOM 可提升性能, 无须整体重新渲染, 而是局部刷新.
JS 对象, diff 算法

### 6.浏览器事件机制中事件触发三个阶段

- **事件捕获阶段**: 从 dom 树节点往下找到目标节点, 不会触发函数
- **事件目标处理函数**: 到达目标节点
- **事件冒泡**: 最后从目标节点往顶层元素传递, 通常函数在此阶段执行.
  addEventListener 第三个参数默认 false(冒泡阶段执行),true(捕获阶段执行).
  阻止冒泡见以上方法

### 7.[什么是跨域？为什么浏览器要使用同源策略？你有几种方式可以解决跨域问题？了解预检请求嘛？](https://segmentfault.com/a/1190000011145364)

- 跨域是指一个域下的文档或脚本试图去请求另一个域下的资源
- 防止 XSS、CSFR 等攻击, 协议+域名+端口不同
- jsonp; 跨域资源共享（CORS）(Access control); 服务器正向代理等

- **预检请求**: 需预检的请求要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响

### 8.[了解浏览器缓存机制吗？](https://www.jianshu.com/p/8b4f3f7bf823)

- 浏览器缓存就是把一个已经请求过的资源拷贝一份存储起来，当下次需要该资源时，浏览器会根据缓存机制决定直接使用缓存资源还是再次向服务器发送请求.
- 作用: 减少网络传输的损耗以及降低服务器压力。
- 缓存位置优先级：Service Worker > Memory Cache > Disk Cache > Push Cache. 都没有命中，就会向服务器发请求
- 策略优先级: 强制缓存 > 协商缓存; cache-control > Expires > Etag > Last-modified

### 9.为什么操作 DOM 慢?

DOM 本身是一个 js 对象, 操作这个对象本身不慢, 但是操作后触发了浏览器的行为, 如 repaint 和 reflow 等浏览器行为, 使其变慢

### 10.什么情况会阻塞渲染？

- js 脚本同步执行
- css 和图片虽然是异步加载, 但 js 文件执行需依赖 css, 所以 css 也会阻塞渲染

### 11.如何判断 js 运行在浏览器中还是 node 中？

判断有无全局对象 global 和 window

### 12.关于 web 以及浏览器处理预加载有哪些思考？

图片等静态资源在使用之前就提前请求
资源使用到的时候能从缓存中加载, 提升用户体验
页面展示的依赖关系维护

### 13.[http 多路复用](https://segmentfault.com/a/1190000011172823)

- **Keep-Alive**: Keep-Alive 解决的核心问题：一定时间内，同一域名多次请求数据，只建立一次 HTTP 请求，其他请求可复用每一次建立的连接通道，以达到提高请求效率的问题。这里面所说的一定时间是可以配置的，不管你用的是 Apache 还是 nginx。
- 解决两个问题: 串行文件传输(采用二进制数据帧); 连接数过多(采用流, 并行传输)

### 14. [http 和 https：](https://www.cnblogs.com/wqhwe/p/5407468.html)

- http: 最广泛网络协议，BS 模型，浏览器高效。
- https: 安全版，通过 SSL 加密，加密传输，身份认证，密钥

1. https 相对于 http 加入了 ssl 层, 加密传输, 身份认证;
2. 需要到 ca 申请收费的证书;
3. 安全但是耗时多，缓存不是很好;
4. 注意兼容 http 和 https;
5. 连接方式不同, 端口号也不同, http 是 80, https 是 443

### 15. [CSRF 和 XSS 区别及防御](https://blog.csdn.net/m0_37631322/article/details/81346335)

### 16. cookie 可设置哪些属性？httponly?

chrome 控制台的 application 下可查看:

- name 　　字段为一个 cookie 的名称。
- value 　　字段为一个 cookie 的值。
- domain 　　字段为可以访问此 cookie 的域名。
- path 　　字段为可以访问此 cookie 的页面路径。 比如 domain 是 abc.com,path 是/test，那么只有/test 路径下的页面可以读取此 cookie。
- expires/Max-Age 　　字段为此 cookie 超时时间。若设置其值为一个时间，那么当到达此时间后，此 cookie 失效。不设置的话默认值是 Session，意思是 cookie 会和 session 一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此 cookie 失效。
- Size 　　字段 此 cookie 大小。
- http 　　字段 cookie 的 httponly 属性。若此属性为 true，则只有在 http 请求头中会带有此 cookie 的信息，而不能通过 document.cookie 来访问此 cookie。
- secure 　　 字段 设置是否只能通过 https 来传递此条 cookie

### 17. 登录后，前端做了哪些工作，如何得知已登录

- 前端存放服务端下发的 cookie, 简单说就是写一个字段在 cookie 中表明已登录, 并设置失效日期
- 或使用后端返回的 token, 每次 ajax 请求将 token 携带在请求头中, 这也是防范 csrf 的手段之一

### 18. [http 状态码](https://www.runoob.com/http/http-status-codes.html)

- 1\*\*: 服务器收到请求, 需请求者进一步操作
- 2\*\*: 请求成功
- 3\*\*: 重定向, 资源被转移到其他 URL 了
- 4\*\*: 客户端错误, 请求语法错误或没有找到相应资源
- 5\*\*: 服务端错误, server error
- 301: 资源(网页等)被永久转移到其他 URL, 返回值中包含新的 URL, 浏览器会自动定向到新 URL
- 302: 临时转移. 客户端应访问原有 URL
- 304: Not Modified. 指定日期后未修改, 不返回资源
- 403: 服务器拒绝执行请求
- 404: 请求的资源(网页等)不存在
- 500: 内部服务器错误

### 19. [Http 请求头缓存设置方法](https://www.cnblogs.com/zhaow/p/7832829.html)

Cache-control, expire, last-modify

### 20. 实现页面回退刷新

- 旧: window.history.back() + window.location.href=document.referrer;
- 新: HTML5 的新 API 扩展了 window.history，使历史记录点更加开放了。可以存储当前历史记录点、替换当前历史记录点、监听历史记录点 onpopstate, replaceState

### 21. [正向代理和反向代理](https://www.cnblogs.com/Anker/p/6056540.html)

- 正向代理:
  （1）访问原来无法访问的资源，如 google
  （2）可以做缓存，加速访问资源
  （3）对客户端访问授权，上网进行认证
  （4）代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息
- 反向代理:
  （1）保证内网的安全，可以使用反向代理提供 WAF 功能，阻止 web 攻击大型网站，通常将反向代理作为公网访问地址，Web 服务器是内网。
  （2）负载均衡，通过反向代理服务器来优化网站的负载

### 22. [关于预检请求](https://www.jianshu.com/p/3a10ac906fd0)

在非简单请求且跨域的情况下，浏览器会自动发起 options 预检请求。

### 23. [三次握手四次挥手](https://www.jianshu.com/p/ad0904df7d76)

- 开启连接用三次握手, 关闭用四次挥手

### 24. TCP 和 UDP 协议

- TCP（Transmission Control Protocol：传输控制协议；面向连接，可靠传输
- UDP（User Datagram Protocol）：用户数据报协议；面向无连接，不可靠传输

### 25. [进程和线程的区别](https://www.cnblogs.com/zhuzhu2016/p/5804875.html)

- 进程：是并发执行的程序在执行过程中分配和管理资源的基本单位，是一个动态概念，竞争计算机系统资源的基本单位。
- 线程：是进程的一个执行单元，是进程内科调度实体。比进程更小的独立运行的基本单位。线程也被称为轻量级进程。
- 一个程序至少一个进程，一个进程至少一个线程。
