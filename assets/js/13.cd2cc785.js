(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{400:function(s,t,a){"use strict";a.r(t);var e=a(54),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"package-json"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#package-json"}},[s._v("#")]),s._v(" package.json")]),s._v(" "),a("p",[s._v("在我们使用"),a("code",[s._v("node")]),s._v("环境进行开发的时候，你的项目根目录下面通常都会有一个"),a("code",[s._v("package.json")]),s._v("文件，里面的内容包括了项目的描述，配置信息以及当前项目所需要的各个模块，当我们使用"),a("code",[s._v("npm install")]),s._v("指令的时候会根据"),a("code",[s._v("package.json")]),s._v("自动在当前项目中添加一个"),a("code",[s._v("node_modules")]),s._v("文件夹，里面存放着当前项目所需要的各个模块,"),a("code",[s._v("package.json")]),s._v("文件没有过多的限制，只要你符合json格式即可，package.json文件可以手工编写，也可以使用"),a("code",[s._v("npm init")]),s._v("指令生成，下面我们主要介绍"),a("code",[s._v("vuex")]),s._v("中的"),a("code",[s._v("package.json")]),s._v("文件的几个重要的的字段以及在我们项目中不常用的字段")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"exports"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"."')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 当通过<script type=module/>匹配")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"module"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./dist/vuex.esm.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 当通过require()加载时匹配 => const Vuex = require('vuex')")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"require"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./dist/vuex.common.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 当通过当包通过 import 或 import()，或者通过 ECMAScript 模块加载器的任何顶层导入或解析操作加载时匹配")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"import"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./dist/vuex.mjs"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"./*"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"./"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 对应基于es6模块规范的es5代码")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"module"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dist/vuex.esm.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 让npm上的所有文件都开启cdn服务")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"unpkg"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dist/vuex.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 和unpkg一样")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"jsdelivr"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dist/vuex.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 定义typescript入口文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"typings"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"types/index.d.ts"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// webpack提供，允许跳过整个模块/文件和整个文件子树")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"sideEffects"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 指定发布时那些文件会发布")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"files"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dist"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"types/index.d.ts"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"types/helpers.d.ts"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"types/logger.d.ts"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"types/vue.d.ts"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br")])]),a("p",[a("code",[s._v("main")]),s._v("&"),a("code",[s._v("exports")]),s._v("字段：在很多的项目中也许你见到更多的是"),a("code",[s._v("main")]),s._v("字段而不包含"),a("code",[s._v("exports")]),s._v("字段，"),a("code",[s._v("main")]),s._v("字段主要是定义当前包的主要入口文件，但是"),a("code",[s._v("main")]),s._v("字段的功能是有限的，而这个时候"),a("code",[s._v("exports")]),s._v("就成了"),a("code",[s._v("main")]),s._v("字段的替代方案，"),a("code",[s._v("exports")]),s._v("字段允许定义包的入口点，当通过"),a("code",[s._v("node_modules")]),s._v("查找或自引用加载到其自身的名称导入时，支持子路径导出和条件导出，如果同时定义"),a("code",[s._v("exports")]),s._v("字段和"),a("code",[s._v("main")]),s._v("字段，那么"),a("code",[s._v("exports")]),s._v("字段的优先级高于"),a("code",[s._v("main")]),s._v("字段，那为什么在"),a("code",[s._v("vuex")]),s._v("的"),a("code",[s._v("package.json")]),s._v("文件中同时定义"),a("code",[s._v("main")]),s._v("字段和"),a("code",[s._v("exports")]),s._v("字段呢？因为"),a("code",[s._v("node")]),s._v("规定，当我们设置包的主入口点的时候，建议在"),a("code",[s._v("exports")]),s._v("字段和"),a("code",[s._v("main")]),s._v("字段同时定义，而以上"),a("code",[s._v("exports")]),s._v("字段使用的是条件导出")]),s._v(" "),a("p",[a("code",[s._v("module")]),s._v("字段：从以上可以看出，"),a("code",[s._v("package.json")]),s._v("文件中有一个"),a("code",[s._v("module")]),s._v("字段，并且对应的值为"),a("code",[s._v("dist/vuex.esm.js")]),s._v("，那这又是做什么用的呢？其实这与打包工具中的"),a("code",[s._v("Tree Shaking")]),s._v("（摇树）功能有关，那什么是Tree Shaking呢？如果讲起比喻成一棵树的话，那么摇树就是将树上枯黄的树叶摇晃下来，看以下我给出一个rollup的例子")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// util.js")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" minus "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" d"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" c "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" d\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// entry.js")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" add"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" minus "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./methos.js"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// bundle.js")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'use strict'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("以上有三个文件，分别是"),a("code",[s._v("methods.js")]),s._v(","),a("code",[s._v("entry.js")]),s._v(","),a("code",[s._v("bundle.js")]),s._v(",我们在"),a("code",[s._v("methods.js")]),s._v("文件中导出了"),a("code",[s._v("add")]),s._v("方法和"),a("code",[s._v("minus")]),s._v("方法，并在"),a("code",[s._v("entry.js")]),s._v("文件中引入了这两个方法，并打印了"),a("code",[s._v("add")]),s._v("方法的返回结果，"),a("code",[s._v("bundle.js")]),s._v("是我们使用"),a("code",[s._v("rollup")]),s._v("打包之后的文件，但是你发现该文件中只有"),a("code",[s._v("add")]),s._v("方法，"),a("code",[s._v("minus")]),s._v("方法并不存在，那这是为什么呢？明明引入了两个方法，为什么打包后只有一个呢？这其实就是"),a("code",[s._v("Tree Shaking")]),s._v("的作用，将未使用的代码进行切除，就像树上枯黄的叶子摇下来是一个道理\n介绍完了"),a("code",[s._v("Tree Shaking")]),s._v("，那我们现在回归正题，再来看看"),a("code",[s._v("module")]),s._v("字段到底有什么作用，通过以上的实例我们知道了"),a("code",[s._v("Tree Shaking")]),s._v("的作用，那么"),a("code",[s._v("Tree Shakin")]),s._v("g功能又是如何实现的呢？其实这归功于"),a("code",[s._v("es6")]),s._v("模块语法的出现，他和"),a("code",[s._v("Common.js")]),s._v("最大的区别在于"),a("code",[s._v("es6")]),s._v("模块语法在编译阶段完成，而"),a("code",[s._v("Common.js")]),s._v("在执行阶段完成，因为"),a("code",[s._v("es6")]),s._v("模块语法在编译阶段完成，这就能够使我们在使用打包工具的时候能够确认我们使用了模块中的那些方法和属性，从而实现"),a("code",[s._v("Tree Shaking")]),s._v("功能，现在我们知道了使用"),a("code",[s._v("es6")]),s._v("模块语法就可以实现"),a("code",[s._v("Tree Shaking")]),s._v("功能，那我们直接使用es6模块语法不就可以了嘛，何必那么麻烦呢？当然不可以的，不然我说这么多干嘛你说是吧，因为如果直接使用"),a("code",[s._v("es6")]),s._v("模块语法会存在两个问题")]),s._v(" "),a("ol",[a("li",[s._v("通常人们在使用打包工具的"),a("code",[s._v("babel")]),s._v("插件编译代码时都会屏蔽掉"),a("code",[s._v("node_modules")]),s._v("目录下的文件。因为按照约定大家发布到"),a("code",[s._v("npm")]),s._v("的模块代码都是基于"),a("code",[s._v("ES5")]),s._v("规范的，因此配置"),a("code",[s._v("babel")]),s._v("插件屏蔽"),a("code",[s._v("node_modules")]),s._v("目录可以极大的提高编译速度，但用户如果使用了我们发布的基于"),a("code",[s._v("ES6")]),s._v("规范的包就必须配置复杂的屏蔽规则以便把我们的包加入编译的白名单")]),s._v(" "),a("li",[s._v("如果用户是在"),a("code",[s._v("NodeJS")]),s._v("环境使用我们的包，那么极有可能连打包这一步骤都没有，如果用户的"),a("code",[s._v("NodeJS")]),s._v("环境又恰巧不支持"),a("code",[s._v("ES6")]),s._v("模块规范，那么就会导致代码报错")])]),s._v(" "),a("p",[s._v("从以上两个问题可知，我们打包出来的文件("),a("code",[s._v("main")]),s._v("指向)应该是一个基于"),a("code",[s._v("es5")]),s._v("的文件，即然这个字段走不通那必然就会诞生一个新的字段，正所谓实现不了，我就自己造一个，这个时候就诞生了"),a("code",[s._v("module")]),s._v("字段，该属性值是一个基于"),a("code",[s._v("es6")]),s._v("模块规范的"),a("code",[s._v("es5")]),s._v("代码文件路径，基于"),a("code",[s._v("es6")]),s._v("模块是为了享受"),a("code",[s._v("Tree Shaking")]),s._v("功能，使用"),a("code",[s._v("es5")]),s._v("是可以在使用"),a("code",[s._v("babel")]),s._v("放心的屏蔽"),a("code",[s._v("node_modules")]),s._v("文件夹，所以在用户使用我们发布的包进行打包的时候，如果用户的打包工具支持该字段，那么则会优先使用"),a("code",[s._v("es6")]),s._v("模块规范的版本，这样就可启用"),a("code",[s._v("Tree Shaking")]),s._v("机制，如果不支持则使用我们打包好的"),a("code",[s._v("Common.js")]),s._v("版本")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node examples/server.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"npm run build:main && npm run build:logger"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"build:main"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node scripts/build-main.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"build:logger"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node scripts/build-logger.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"lint"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"eslint src test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"npm run lint && npm run test:types && npm run test:unit && npm run test:ssr && npm run test:e2e && npm run test:esm"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test:unit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"jest --testPathIgnorePatterns test/e2e"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test:e2e"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"start-server-and-test dev http://localhost:8080 \\"jest --testPathIgnorePatterns test/unit\\""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test:ssr"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cross-env VUE_ENV=server jest --testPathIgnorePatterns test/e2e"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test:types"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"tsc -p types/test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test:esm"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node test/esm/esm-test.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"coverage"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"jest --testPathIgnorePatterns test/e2e --coverage"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"changelog"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"conventional-changelog -p angular -i CHANGELOG.md -s"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"release"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node scripts/release.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"docs"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress dev docs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"docs:build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress build docs"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br")])]),a("p",[s._v("以上这个"),a("code",[s._v("scripts")]),s._v("这个字段我相信大家都很熟悉，首先它是一个对象，里面盛放着我们需要执行的运行指令，但是今天这个不是我们讨论的重点，今天我们讨论的重点是，当我们执行"),a("code",[s._v("npm run xxx")]),s._v("的时候它到底发生了啥？假设我们在一个项目目录下创建了一个"),a("code",[s._v("package.json")]),s._v("文件，然后执行"),a("code",[s._v("npm install jest")]),s._v("安装"),a("code",[s._v("jest")]),s._v("，并在"),a("code",[s._v("package.json")]),s._v("文件中配置的运行指令如下")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"jest watchAll"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("现在我们就可以执行"),a("code",[s._v("npm run test")]),s._v("这个指令了，那么执行这个指令的时候发生了什么呢？为嘛要这样写呢？（作死）额...这"),a("br"),s._v("\n实际上当我们执行"),a("code",[s._v("npm run test")]),s._v("的时候，其实执行的是"),a("code",[s._v("jest watchAll")]),s._v("这个指令（ok，第一个问题解决），这个时候你可能就会想那我们执行"),a("code",[s._v("jest watchAll")]),s._v("不就好了，非得搞得这样干嘛，显得高大上吗？答案当然是不是的，当我们直接执行"),a("code",[s._v("jest watchAll")]),s._v("的时候，因为没有在全局配置该指令，所以就会导致报错（哦～该死的），这个时候聪明的你又会想，那为什么执行"),a("code",[s._v("npm run test")]),s._v("就不会报错呢，难道这样屌一点吗？答案是：屌不屌不知道，反正不会报错，因为在我们使用"),a("code",[s._v("npm install jest -D")]),s._v("这个指令安装我们的依赖包的时候，就会在"),a("code",[s._v("node_modules")]),s._v("这个文件夹的"),a("code",[s._v(".bin")]),s._v("文件夹的下面创建以"),a("code",[s._v("jest")]),s._v("为名的一个可执行文件（你不信你试试），"),a("code",[s._v(".bin")]),s._v("目录不是任何的一个依赖包，而是一个装有你当前安装的全部依赖的一个个软链接的文件夹，打开这个软链接你会根据注释发现其实这个是一个可执行的脚本文件，所以当我们执行"),a("code",[s._v("npm run test")]),s._v("的时候实际上执行的"),a("code",[s._v("jest watchAll")]),s._v("，虽然我们并没有在我们的操作系统中安装该指令，但是"),a("code",[s._v("npm")]),s._v("会到"),a("code",[s._v("node_modules")]),s._v("中的"),a("code",[s._v(".bin")]),s._v("目录下去找相关的脚本，如找到则执行，那这样我们就可以理解为我们实际上执行的是"),a("code",[s._v("./node_modules/.bin/jest")]),s._v("，"),a("code",[s._v("watchAll")]),s._v("会以参数的形式传入，这也就是为什么当我们执行"),a("code",[s._v("npx xxx")]),s._v("不会报错的原因，因为"),a("code",[s._v("npx")]),s._v("会自动到当前项目中的"),a("code",[s._v("node_modules")]),s._v("中的"),a("code",[s._v(".bin")]),s._v("目录下去找相关的脚本，所以不会报错，那这个时候聪明的你又会想（有完没完，有完没完），"),a("code",[s._v(".bin")]),s._v("目录下的文件是哪里来的呢？其实这个时候你可以打开"),a("code",[s._v("node_modules")]),s._v("文件夹中的"),a("code",[s._v("jest")]),s._v("文件夹，并打开里面的"),a("code",[s._v("package.json")]),s._v("文件，这个时候你就可以找到一个如下的字段了")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"bin"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"jest"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"bin/jest.js"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("打开"),a("code",[s._v("bin")]),s._v("目录下的"),a("code",[s._v("jest.js")]),s._v("文件你会发现和执行脚本是一样的，这个时候你大概猜到，当我们执行"),a("code",[s._v("npm install xxx")]),s._v("的时候，"),a("code",[s._v("npm")]),s._v("读到该配置后，就将该文件软链接到"),a("code",[s._v("./node_modules/.bin")]),s._v("目录下，而"),a("code",[s._v("npm")]),s._v("还会自动把"),a("code",[s._v("node_modules/.bin")]),s._v("加入"),a("code",[s._v("$PATH")]),s._v("，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了")])])}),[],!1,null,null,null);t.default=n.exports}}]);