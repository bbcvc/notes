---
outline: deep
---

# webpack

### webpack3和webpack4的区别？
1. mode/–mode参数: 新增了mode/--mode参数来表示是开发还是生产（development/production）; production 侧重于打包后的文件大小，development侧重于构建速度
2. 移除loaders，必须使用rules（在3版本的时候loaders和rules 是共存的但是到4的时候只允许使用rules）
3. 移除了CommonsChunkPlugin (提取公共代码)，用optimization.splitChunks和optimization.runtimeChunk来代替
4. 支持es6的方式导入JSON文件，并且可以过滤无用的代码

### 什么是Loader?什么是Plugin?
- Loader: webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。
- Plugin: 插件目的在于解决loader无法实现的其他事。webpack的功能和生命周期都是通过插件实现的。插件是一个具有apply方法的JavaScript对象。apply方法会被webpack compiler调用，并且compiler对象可在整个编译生命周期访问。

### Webpack的构建流程？
1. 初始化参数：从配置文件和Shell语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行对象的run方法开始执行编译；
3. 确定入口：根据配置中的entry找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的Loader对模块进行编译，再找出该模块依赖的模块，递归本步骤直到所有入口依赖的文件都经过了本步骤的编译；
5. 完成模块编译：在经过第4步使用Loader编译完所有模块后，得到了每个模块被编译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk，再把每个Chunk转换成一个单独的文件加入到输出列表；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
::: tip
所谓 Webpack 执行流程核心基于 tapable ，理解它才是理解 webpack 执行流程的关键所在。
https://www.zhihu.com/answer/2358637617
:::
