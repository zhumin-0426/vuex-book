## package.json
在我们使用`vue`框架进行开发的时候，你的项目根目录下面都会有一个`package.json`文件，里面的内容包括了项目的描述，配置信息以及当前项目所需要的各个模块，当我们使用`npm install`指令的时候会根据`package.json`自动在当前项目中添加一个`node_modules`文件夹，里面存放着当前项目所需要的各个模块,`package.json`文件没有过多的限制，只要你符合json格式即可，package.json文件可以手工编写，也可以使用`npm init`指令生成，下面我们主要介绍几个重要的的字段以及在我们项目中不常用的字段：
```json
"exports": {
    ".": {
        "module": "./dist/vuex.esm.js",
        "require": "./dist/vuex.common.js",
        "import": "./dist/vuex.mjs"
    },
    "./*": "./*",
    "./": "./"
}
```