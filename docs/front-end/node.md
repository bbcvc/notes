---
outline: deep
---

# node相关

### 1. node 的 router 是什么

### 2. 数据库索引是啥

- 狭义上: 索引是数据库针对每条数据自动生成的内部唯一 id 标识, 用以快速搜索定位数据
- 广义上: 是数据库根据每条数据形成的关键字, 将划分为树形结构, 便于 sql 语句对数据的查找, 使算法复杂度降低到 O(logn)

### 3. [浏览器的事件循环和 node 事件循环有什么区别？](https://www.jianshu.com/p/b221e6e36dcb)

微任务执行时机不同：
Node 环境：微任务在事件循环的各个阶段的 空隙（中间）执行
浏览器：微任务在事件循环的宏任务执行完后执行

### 4. 关于 buffer

- node 中的核心对象：`Buffer.from(str)`
- 用来存储二进制数据的类数组
- 用两位十六进制数表示一个字符的`unicode`编码
- 连续存储空间，快
- 1 byte = 8 bit
- 英文字符 1 byte, 中文字符 2 byte
