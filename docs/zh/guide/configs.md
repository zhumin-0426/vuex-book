在了解相关工具的配置文件之前，我们先来了解一下vuex中使用到的一些相关的工具，具体做了哪些事情，为什么需要用到它们，这样就可以让我们对前端工程有一个大致的认识，而不至于一脸茫然（what you say？）
* babel<br/>
babel是一个javascript编译器，能将es5+的代码转换为当前浏览器环境兼容的代码，比如IE浏览器......<br/>
那我们为什么需要用到它们呢？原因在于我们在发布一个包的时候，你很有可能在你当前开发的项目中使用了es5+的相关语法，比如`promise`等等，如果你不使用编译器对相关的语法进行转义的话很有可能在某些浏览中报错，比如在低版本的火狐浏览器中使用`promise`就会报出`promise is not a function`，而这个时候你就需要使用jevascript编译器对代码进行转换了，如果你使用了babel，那么你可能需要引入@babel/polyfill或者引入core-js/stable+rehenerrator-runtime/runtime这两个包
* eslint<br/>
ESLint是在ECMAScript/JavaScript代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误，`eslint`完全是可配置的，这意味着你可以关闭每一个规则而只运行基本的语法验证，当我们进行多人开发的时候，因为每个人的码字能力不一，这就很有可能出现的比较低级的错误，比如在生产环境中，我们一般会把`console.log()`方法全部去除，如果我们不使用代码检测工具，那么很有可能在项目发布的时候忘了去除，相反如果使用了那么在你打包项目的时候则会提示你去修正该错误
* jest<br/>
`jest`是一个测试框架，它适用于使用以下的项目：Babel、TypeScript、Node、React、Angular、Vue等等，这能在项目发布时可以显著降低项目风险率，当然这也许能成为你"平庸"项目中的一道风景线哦，至此走上加薪的道路，赢取......下面我们来看一个简单的例子：<br/>

index.js
```js
export add(a, b) {
    return a + b
}
```
index.spec.js<br/>

```js
import { add } form "./index"

it('测试add函数', () => {
    expect(add(1, 2)).toBe(3)
})
```
如上所示，`index.js`是一个我们项目的js文件，`index.spec.js`是我们写的测试文件，在该测试文件中引入了`add`函数，并在下面执行了一段代码，下面我们主要来看这一行的代码：
```js
expect(add(1, 2)).toBe(3)
```
那么这段代码是什么意思呢?我们看到在`expect`方法中传递了一个`add`方法，并传递了两个参数1和2，`expect`翻译过来为期望，期待的意思，所以这行代码可以理解为，期望`add`函数的返回结果为3，`.toBe()`是`jest`中的一个匹配器，匹配结果用的，如果`add`函数的返回结果不匹配那么测试代码将报错，利用`jest`可以做单元测试和集成测试，在vuex进行了`e2e`测试（End to End）等
* webpack&&rollup<br/>
众所周知，webpack和rollup都是前端的打包工具，但是在谈打包工具之前我们先谈谈前端工程化，前端工程化主要包含四部分，模块化，规范化，自动化，组件化，现在我们主要谈谈模块化，在很久之前，还没有出现的`Common.js`的时候，前端开发应用时只能使用<script src=""></script>将多个`js`文件文件引入在同一个`html`文件，可能在一个`js`文件中就存在上万行的代码量，这就导致项目可维护性降低，但是随着`js`的发展，`es6`中出现了模块语法，我们可以将一个`js`文件分割成多个模块，然后使用`import...from...`引入，所以在项目出现`bug`的时候，我们只需要找到当前模块即可，这就使开发效率和项目的可维护性得以提升，而`webpack`和`rollup`的主要功能就是将多个模块打包成一个文件

## webpack.config.js
## rollup.config.js
## .eslintrc.json
## .babelrc
## jest.config.js

::: tip 相关官方文档地址
babel: https://babeljs.io/<br/>
rollup: https://rollupjs.org/guide/en/<br/>
webpack: https://webpack.js.org/<br/>
eslint: https://eslint.org/<br/>
jest: https://jestjs.io/<br/>
:::