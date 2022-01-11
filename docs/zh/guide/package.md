## package.json
在我们使用`vue`框架进行开发的时候，你的项目根目录下面都会有一个`package.json`文件，里面的内容包括了项目的描述，配置信息以及当前项目所需要的各个模块，当我们使用`npm install`指令的时候会根据`package.json`自动在当前项目中添加一个`node_modules`文件夹，里面存放着当前项目所需要的各个模块,`package.json`文件没有过多的限制，只要你符合json格式即可，package.json文件可以手工编写，也可以使用`npm init`指令生成，下面我们主要介绍几个重要的的字段以及在我们项目中不常用的字段：
```json
"exports": {
    ".": {
        // 当通过<script type=module/>匹配
        "module": "./dist/vuex.esm.js",
        // 当通过require()加载时匹配 => const Vuex = require('vuex')
        "require": "./dist/vuex.common.js",
        // 当通过当包通过 import 或 import()，或者通过 ECMAScript 模块加载器的任何顶层导入或解析操作加载时匹配
        "import": "./dist/vuex.mjs"
    },
    "./*": "./*",
    "./": "./"
},
// 对应基于es6模块规范的es5代码
"module": "dist/vuex.esm.js",
// 让npm上的所有文件都开启cdn服务
"unpkg": "dist/vuex.js",
// 和unpkg一样
"jsdelivr": "dist/vuex.js",
// 定义typescript入口文件
"typings": "types/index.d.ts",
// webpack提供
"sideEffects": false,
// 指定发布时那些文件会发布
"files": [
    "dist",
    "types/index.d.ts",
    "types/helpers.d.ts",
    "types/logger.d.ts",
    "types/vue.d.ts"
]
```
`main`&`exports`：在很多的项目中也许你见到更多的是`main`字段而不包含`exports`字段，`main`字段主要是定义当前包的主要入口文件，但是`main`字段的功能是有限的，而这个时候exports就提供了`main`字段的替代方案，"exports" 字段允许定义包的入口点，当通过 node_modules查找或自引用加载到其自身的名称的名称导入时，支持子路径导出和条件导出，如果同时定义`exports`字段和`main`字段，那么`exports`字段的优先级高于`main`字段，那为什么在vuex中的package.json中同时定义`main`字段和`exports`字段呢？因为node规定，当我们设置包的主入口点的时候，建议在`exports`字段和`main`字段同时定义，而以上`exports`字段使用的是条件导出

`module`：从以上可以看出，`package.json`文件中有一个`module`字段，并且对应的值为"dist/vuex.esm.js"，那这又是做什么用的呢？其实这与打包工具中的Tree Shaking（摇树）功能有关，那什么优势Tree Shaking呢？如果讲起比喻成一棵树的话，那么摇树就是将树上枯黄的树叶摇晃下来，看以下我给出一个rollup的例子：<br/>
util.js
```js
export const add = (a, b) => {
    return a + b
}

export const minus = (c, d) {
    return c + d
}
```
entry.js

```js
import { add, minus } from "./methos.js"
const result = add(1,2)
console.log(result)
```
bundle.js
```js
'use strict';

const add = (a, b) => {
    return a + b
};

const result = add(1,2);

console.log(result);

```
以上有三个文件，分别是`methods.js`,`entry.js`,`bundle.js`,我们在`methods.js`文件中导出了add方法和minus方法，并在`entry.js`文件中引入了这两个方法，并打印了add方法的返回结果，bundle.js是我们使用rollup打包之后的文件，但是你发现该文件中只有add方法，minus方法并不存在，那这是为什么呢？明明引入了两个方法，为什么打包后只有一个呢？这其实就是Tree Shaking的作用，将没用的代码进行切除，就像树上枯黄的叶子摇下来是一个道理

介绍完了Tree Shaking，那我们现在回归正题，再来看看`module`字段到底有什么作用，通过以上的实例我们知道了Tree Shaking的作用，那么Tree Shaking功能又是如何实现的呢？其实这归功于es6模块语法的出现，他和Common.js最大的区别在于es6模块语法在编译阶段完成，而Common.js在执行阶段完成，因为es6模块语法在编译阶段完成，这就能够使我们在使用打包工具的时候能够确认我们使用了模块中的那些方法和属性，从而实现Tree Shaking功能，现在我们知道了使用es6模块语法就可以实现Tree Shaking功能，那我们直接使用es6模块语法不久可以了嘛，何必那么麻烦呢（当然不可以，不然我说这么多废话干嘛）？如果直接使用es6模块语法会存在两个问题：
1. 通常人们在使用打包工具的 babel 插件编译代码时都会屏蔽掉 node_modules 目录下的文件。因为按照约定大家发布到 npm 的模块代码都是基于 ES5 规范的，因此配置 babel 插件屏蔽 node_modules 目录可以极大的提高编译速度。但用户如果使用了我们发布的基于 ES6 规范的包就必须配置复杂的屏蔽规则以便把我们的包加入编译的白名单
2. 如果用户是在 NodeJS 环境使用我们的包，那么极有可能连打包这一步骤都没有。如果用户的 NodeJS 环境又恰巧不支持 ES6 模块规范，那么就会导致代码报错

从以上两个问题可知，我们打包出来的文件（main指向）应该是一个基于es5的文件，即然这个字段走不通那必然就会诞生一个新的字段，正所谓实现不了，我就自己造一个，这个时候就诞生了`module`字段，该属性值是一个基于es6模块规范的es5代码文件路径，基于es6模块是为了享受Tree Shaking功能，使用es5是可以在使用babel放心的屏蔽node_modules文件夹，所以在用户使用我们发布的包进行打包的时候，如果用户的打包工具支持该字段，那么则会优先使用es6模块规范的版本，这样就可启用 Tree Shaking 机制，如果不支持则使用我们打包好的Common.js版本

```json
"scripts": {
    // 实例node服务运行脚本
    "dev": "node examples/server.js",
    // 依次执行npm run build:main和npm run build:logger指令
    "build": "npm run build:main && npm run build:logger",
    // 
    "build:main": "node scripts/build-main.js",
    "build:logger": "node scripts/build-logger.js",
    "lint": "eslint src test",
    "test": "npm run lint && npm run test:types && npm run test:unit && npm run test:ssr && npm run test:e2e && npm run test:esm",
    "test:unit": "jest --testPathIgnorePatterns test/e2e",
    "test:e2e": "start-server-and-test dev http://localhost:8080 \"jest --testPathIgnorePatterns test/unit\"",
    "test:ssr": "cross-env VUE_ENV=server jest --testPathIgnorePatterns test/e2e",
    "test:types": "tsc -p types/test",
    "test:esm": "node test/esm/esm-test.js",
    "coverage": "jest --testPathIgnorePatterns test/e2e --coverage",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "release": "node scripts/release.js",
    "docs": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
```












