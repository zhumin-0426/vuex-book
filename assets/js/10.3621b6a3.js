(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{394:function(s,t,a){"use strict";a.r(t);var n=a(54),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[s._v("#")]),s._v(" 介绍")]),s._v(" "),a("p",[s._v("在了解相关工具的配置文件之前，我们先来了解一下vuex中使用到的一些相关的工具，具体做了哪些事情，为什么需要用到它们，这样就可以让我们对前端工程有一个大致的认识，而不至于一脸茫然（what you say？）")]),s._v(" "),a("ul",[a("li",[s._v("babel"),a("br"),s._v("\nbabel是一个javascript编译器，能将es5+的代码转换为当前浏览器环境兼容的代码，比如IE浏览器......"),a("br"),s._v("\n那我们为什么需要用到它们呢？原因在于我们在发布一个包的时候，你很有可能在你当前开发的项目中使用了es5+的相关语法，比如"),a("code",[s._v("promise")]),s._v("等等，如果你不使用编译器对相关的语法进行转义的话很有可能在某些浏览中报错，比如在低版本的火狐浏览器中使用"),a("code",[s._v("promise")]),s._v("就会报出"),a("code",[s._v("promise is not a function")]),s._v("，而这个时候你就需要使用jevascript编译器对代码进行转换了，如果你使用了babel，那么你可能需要引入@babel/polyfill或者引入core-js/stable+rehenerrator-runtime/runtime这两个包")]),s._v(" "),a("li",[s._v("eslint"),a("br"),s._v("\nESLint是在ECMAScript/JavaScript代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误，"),a("code",[s._v("eslint")]),s._v("完全是可配置的，这意味着你可以关闭每一个规则而只运行基本的语法验证，当我们进行多人开发的时候，因为每个人的码字能力不一，这就很有可能出现的比较低级的错误，比如在生产环境中，我们一般会把"),a("code",[s._v("console.log()")]),s._v("方法全部去除，如果我们不使用代码检测工具，那么很有可能在项目发布的时候忘了去除，相反如果使用了那么在你打包项目的时候则会提示你去修正该错误")]),s._v(" "),a("li",[s._v("jest"),a("br"),s._v(" "),a("code",[s._v("jest")]),s._v('是一个测试框架，它适用于使用以下的项目：Babel、TypeScript、Node、React、Angular、Vue等等，这能在项目发布时可以显著降低项目风险率，当然这也许能成为你"平庸"项目中的一道风景线哦，至此走上加薪的道路，赢取......下面我们来看一个简单的例子：'),a("br")])]),s._v(" "),a("p",[s._v("index.js")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("index.spec.js"),a("br")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" add "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" form "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./index"')]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("it")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'测试add函数'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("expect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toBe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("如上所示，"),a("code",[s._v("index.js")]),s._v("是一个我们项目的js文件，"),a("code",[s._v("index.spec.js")]),s._v("是我们写的测试文件，在该测试文件中引入了"),a("code",[s._v("add")]),s._v("函数，并在下面执行了一段代码，下面我们主要来看这一行的代码：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("expect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toBe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("那么这段代码是什么意思呢?我们看到在"),a("code",[s._v("expect")]),s._v("方法中传递了一个"),a("code",[s._v("add")]),s._v("方法，并传递了两个参数1和2，"),a("code",[s._v("expect")]),s._v("翻译过来为期望，期待的意思，所以这行代码可以理解为，期望"),a("code",[s._v("add")]),s._v("函数的返回结果为3，"),a("code",[s._v(".toBe()")]),s._v("是"),a("code",[s._v("jest")]),s._v("中的一个匹配器，匹配结果用的，如果"),a("code",[s._v("add")]),s._v("函数的返回结果不匹配那么测试代码将报错，利用"),a("code",[s._v("jest")]),s._v("可以做单元测试和集成测试，在vuex进行了"),a("code",[s._v("e2e")]),s._v("测试（End to End）等")]),s._v(" "),a("ul",[a("li",[s._v("webpack&&rollup"),a("br"),s._v("\n众所周知，webpack和rollup都是前端的打包工具，但是在谈打包工具之前我们先谈谈前端工程化，前端工程化主要包含四部分，模块化，规范化，自动化，组件化，现在我们主要谈谈模块化，在很久之前，还没有出现的"),a("code",[s._v("Common.js")]),s._v("的时候，前端开发应用时只能使用"),a("script",{attrs:{src:""}}),s._v("将多个"),a("code",[s._v("js")]),s._v("文件文件引入在同一个"),a("code",[s._v("html")]),s._v("文件，可能在一个"),a("code",[s._v("js")]),s._v("文件中就存在上万行的代码量，这就导致项目可维护性降低，但是随着"),a("code",[s._v("js")]),s._v("的发展，"),a("code",[s._v("es6")]),s._v("中出现了模块语法，我们可以将一个"),a("code",[s._v("js")]),s._v("文件分割成多个模块，然后使用"),a("code",[s._v("import...from...")]),s._v("引入，所以在项目出现"),a("code",[s._v("bug")]),s._v("的时候，我们只需要找到当前模块即可，这就使开发效率和项目的可维护性得以提升，而"),a("code",[s._v("webpack")]),s._v("和"),a("code",[s._v("rollup")]),s._v("的主要功能就是将多个模块打包成一个文件")])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("提示")]),s._v(" "),a("p",[s._v("现在我们主要对"),a("code",[s._v("rollup.config.js")]),s._v("这个配置文件进行讲解，因为其它的配置文件我相信你可以看懂的，如果未能看懂请参考底部文档地址链接，看完相关文档我相信你能看懂🤔")])]),s._v(" "),a("h3",{attrs:{id:"rollup-config-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-config-js"}},[s._v("#")]),s._v(" rollup.config.js")]),s._v(" "),a("p",[s._v("找到"),a("code",[s._v("vuex")]),s._v("文件根目录的"),a("code",[s._v("rollup.config.js")]),s._v(",在讲解配置文件之前，我们先看看该配置文件引入了那些东西有哪些作用，这样我们才能更好的分析当前配置文件具体做了什么事,如下")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//  buble的主要功能是编译es5+的代码，相当于简化版的bable，既然是使用了buble那为什么vuex还要使用babel呢，原因很简单，既然前面提到了简化版，那么当然有babel能做buble不能做的，buble只能编译一些简单的语法（例如尖头函数等）")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" buble "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@rollup/plugin-buble'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// replace的主要作用是替文件中的目标字符串")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" replace "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@rollup/plugin-replace'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// resolve的主要功能是告诉rollup如何寻找外部依赖")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" resolve "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@rollup/plugin-node-resolve'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// commonjs的主要功能是将CommonJs模块转换为es6模块")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" commonjs "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@rollup/plugin-commonjs'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// terser的主要功能是最小化打包代码")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" terser "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'rollup-plugin-terser'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 当前vuex根目录的package.json文件")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" pkg "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./package.json'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("p",[s._v("由上可知在该"),a("code",[s._v("rollup.config.js")]),s._v("引入了那些依赖以及这些依赖的一些作用，现在我们来分析该配置文件中核心部分，首先我们来看"),a("code",[s._v("createEntries")]),s._v("函数和"),a("code",[s._v("createEntry")]),s._v("函数，如下：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("createEntries")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" configs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("c")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("createEntry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("createEntry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("config")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" isGlobalBuild "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("format "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'iife'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" isBundlerBuild "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("format "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'iife'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("browser\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" isBundlerESMBuild "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("format "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'es'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("browser\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" c "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    external"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vue'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    input"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("input"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    plugins"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    output"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      banner"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      file"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("file"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      format"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("format"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      globals"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        vue"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Vue'")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("onwarn")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("msg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" warn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("Circular")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("msg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("warn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("msg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("isGlobalBuild"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("output"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("output"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("||")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Vuex'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("isGlobalBuild"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("external"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vue/devtools-api'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    preventAssignment"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    __VERSION__"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" pkg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("version"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    __DEV__"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" isBundlerBuild\n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[s._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("(process.env.NODE_ENV !== 'production')")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[s._v("`")])]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("env "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'production'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    __VUE_PROD_DEVTOOLS__"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" isBundlerESMBuild\n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'__VUE_PROD_DEVTOOLS__'")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'false'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("transpile "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("buble")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("commonjs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("minify"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("terser")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" module"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("format "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'es'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" c\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br"),a("span",{staticClass:"line-number"},[s._v("59")]),a("br")])]),a("p",[s._v("由上可知"),a("code",[s._v("createEntries")]),s._v("的主要作用就是循环"),a("code",[s._v("configs")]),s._v("这个数组，然后将数组的每一项传递给"),a("code",[s._v("createEntry")]),s._v("这个函数，这样做的目的是在编译的时候根据不同的参数生成不同的出口文件，那么"),a("code",[s._v("createEntry")]),s._v("函数的作用可想而知，就是在执行的时刻根据"),a("code",[s._v("createEntries")]),s._v("传递的参数进行不同的配置，因为"),a("code",[s._v("rollup.config.js")]),s._v("默认是导出一个对象的，所以"),a("code",[s._v("createEntry")]),s._v("也应该是返回一个对象")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("官方文档地址")]),s._v(" "),a("p",[s._v("babel:"),a("a",{attrs:{href:"'https://babeljs.io/'"}},[s._v("babel")]),a("br"),s._v("\nrollup: "),a("a",{attrs:{href:"'https://rollupjs.org/guide/en/'"}},[s._v("rollup")]),a("br"),s._v("\nwebpack: "),a("a",{attrs:{href:"'https://webpack.js.org/'"}},[s._v("webpack")]),a("br"),s._v("\neslint: "),a("a",{attrs:{href:"'https://eslint.org/'"}},[s._v("eslint")]),a("br"),s._v("\njest: "),a("a",{attrs:{href:"'https://jestjs.io/'"}},[s._v("jest")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);