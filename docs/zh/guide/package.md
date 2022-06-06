## package.json
在我们使用`node`环境进行开发的时候，你的项目根目录下面通常都会有一个`package.json`文件，里面的内容包括了项目的描述，配置信息以及当前项目所需要的各个模块，当我们使用`npm install`指令的时候会根据`package.json`自动在当前项目中添加一个`node_modules`文件夹，里面存放着当前项目所需要的各个模块,`package.json`文件没有过多的限制，只要你符合json格式即可，package.json文件可以手工编写，也可以使用`npm init`指令生成，下面我们主要介绍`vuex`中的`package.json`文件的几个重要的的字段以及在我们项目中不常用的字段
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
// webpack提供，允许跳过整个模块/文件和整个文件子树
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
//TODO  还没完全解释清晰
`main`&`exports`字段：在很多的项目中也许你见到更多的是`main`字段而不包含`exports`字段，`main`字段主要是定义当前包的主要入口文件，但是`main`字段的功能是有限的，而这个时候`exports`就成了`main`字段的替代方案，`exports`字段允许定义包的入口点，当通过`node_modules`查找或自引用加载到其自身的名称导入时，支持子路径导出和条件导出，如果同时定义`exports`字段和`main`字段，那么`exports`字段的优先级高于`main`字段，那为什么在`vuex`的`package.json`文件中同时定义`main`字段和`exports`字段呢？因为`node`规定，当我们设置包的主入口点的时候，建议在`exports`字段和`main`字段同时定义，而以上`exports`字段使用的是条件导出

`module`字段：从以上可以看出，`package.json`文件中有一个`module`字段，并且对应的值为`dist/vuex.esm.js`，那这又是做什么用的呢？其实这与打包工具中的`Tree Shaking`（摇树）功能有关，那什么是Tree Shaking呢？如果讲起比喻成一棵树的话，那么摇树就是将树上枯黄的树叶摇晃下来，看以下我给出一个rollup的例子
```js
// util.js
export const add = (a, b) => {
    return a + b
}

export const minus = (c, d) {
    return c + d
}
```
```js
// entry.js
import { add, minus } from "./methos.js"
const result = add(1,2)
console.log(result)
```
```js
// bundle.js
'use strict';
const add = (a, b) => {
    return a + b
};
const result = add(1,2);
console.log(result);
```
以上有三个文件，分别是`methods.js`,`entry.js`,`bundle.js`,我们在`methods.js`文件中导出了`add`方法和`minus`方法，并在`entry.js`文件中引入了这两个方法，并打印了`add`方法的返回结果，`bundle.js`是我们使用`rollup`打包之后的文件，但是你发现该文件中只有`add`方法，`minus`方法并不存在，那这是为什么呢？明明引入了两个方法，为什么打包后只有一个呢？这其实就是`Tree Shaking`的作用，将未使用的代码进行切除，就像树上枯黄的叶子摇下来是一个道理
介绍完了`Tree Shaking`，那我们现在回归正题，再来看看`module`字段到底有什么作用，通过以上的实例我们知道了`Tree Shaking`的作用，那么`Tree Shakin`g功能又是如何实现的呢？其实这归功于`es6`模块语法的出现，他和`Common.js`最大的区别在于`es6`模块语法在编译阶段完成，而`Common.js`在执行阶段完成，因为`es6`模块语法在编译阶段完成，这就能够使我们在使用打包工具的时候能够确认我们使用了模块中的那些方法和属性，从而实现`Tree Shaking`功能，现在我们知道了使用`es6`模块语法就可以实现`Tree Shaking`功能，那我们直接使用es6模块语法不就可以了嘛，何必那么麻烦呢？当然不可以的，不然我说这么多干嘛你说是吧，因为如果直接使用`es6`模块语法会存在两个问题
1. 通常人们在使用打包工具的`babel`插件编译代码时都会屏蔽掉`node_modules`目录下的文件。因为按照约定大家发布到`npm`的模块代码都是基于`ES5`规范的，因此配置`babel`插件屏蔽`node_modules`目录可以极大的提高编译速度，但用户如果使用了我们发布的基于`ES6`规范的包就必须配置复杂的屏蔽规则以便把我们的包加入编译的白名单
2. 如果用户是在`NodeJS`环境使用我们的包，那么极有可能连打包这一步骤都没有，如果用户的`NodeJS`环境又恰巧不支持`ES6`模块规范，那么就会导致代码报错

从以上两个问题可知，我们打包出来的文件(`main`指向)应该是一个基于`es5`的文件，即然这个字段走不通那必然就会诞生一个新的字段，正所谓实现不了，我就自己造一个，这个时候就诞生了`module`字段，该属性值是一个基于`es6`模块规范的`es5`代码文件路径，基于`es6`模块是为了享受`Tree Shaking`功能，使用`es5`是可以在使用`babel`放心的屏蔽`node_modules`文件夹，所以在用户使用我们发布的包进行打包的时候，如果用户的打包工具支持该字段，那么则会优先使用`es6`模块规范的版本，这样就可启用`Tree Shaking`机制，如果不支持则使用我们打包好的`Common.js`版本

```json
"scripts": {
    "dev": "node examples/server.js",
    "build": "npm run build:main && npm run build:logger",
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
以上这个`scripts`这个字段我相信大家都很熟悉，首先它是一个对象，里面盛放着我们需要执行的运行指令，但是今天这个不是我们讨论的重点，今天我们讨论的重点是，当我们执行`npm run xxx`的时候它到底发生了啥？假设我们在一个项目目录下创建了一个`package.json`文件，然后执行`npm install jest`安装`jest`，并在`package.json`文件中配置的运行指令如下
```json
"scripts":{
    "test":"jest watchAll"
}
```
现在我们就可以执行`npm run test`这个指令了，那么执行这个指令的时候发生了什么呢？为嘛要这样写呢？（作死）额...这<br/>
实际上当我们执行`npm run test`的时候，其实执行的是`jest watchAll`这个指令（ok，第一个问题解决），这个时候你可能就会想那我们执行`jest watchAll`不就好了，非得搞得这样干嘛，显得高大上吗？答案当然是不是的，当我们直接执行`jest watchAll`的时候，因为没有在全局配置该指令，所以就会导致报错（哦～该死的），这个时候聪明的你又会想，那为什么执行`npm run test`就不会报错呢，难道这样屌一点吗？答案是：屌不屌不知道，反正不会报错，因为在我们使用`npm install jest -D`这个指令安装我们的依赖包的时候，就会在`node_modules`这个文件夹的`.bin`文件夹的下面创建以`jest`为名的一个可执行文件（你不信你试试），`.bin`目录不是任何的一个依赖包，而是一个装有你当前安装的全部依赖的一个个软链接的文件夹，打开这个软链接你会根据注释发现其实这个是一个可执行的脚本文件，所以当我们执行`npm run test`的时候实际上执行的`jest watchAll`，虽然我们并没有在我们的操作系统中安装该指令，但是`npm`会到`node_modules`中的`.bin`目录下去找相关的脚本，如找到则执行，那这样我们就可以理解为我们实际上执行的是`./node_modules/.bin/jest`，`watchAll`会以参数的形式传入，这也就是为什么当我们执行`npx xxx`不会报错的原因，因为`npx`会自动到当前项目中的`node_modules`中的`.bin`目录下去找相关的脚本，所以不会报错，那这个时候聪明的你又会想（有完没完，有完没完），`.bin`目录下的文件是哪里来的呢？其实这个时候你可以打开`node_modules`文件夹中的`jest`文件夹，并打开里面的`package.json`文件，这个时候你就可以找到一个如下的字段了
```json
"bin": {
    "jest": "bin/jest.js"
},
```
打开`bin`目录下的`jest.js`文件你会发现和执行脚本是一样的，这个时候你大概猜到，当我们执行`npm install xxx`的时候，`npm`读到该配置后，就将该文件软链接到`./node_modules/.bin`目录下，而`npm`还会自动把`node_modules/.bin`加入`$PATH`，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了















