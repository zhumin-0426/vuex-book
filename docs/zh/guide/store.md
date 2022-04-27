### Store对象的初始化
根据我们前面对入口文件的分析，我们知道了在入口文件中引入并导出了一个`Store`以及`install`，根据引入的路径找到入口文件同级目录下的`store.js`文件并可看到在该文件中导出了一个`Store`类和一个`install`方法，导出`Store`可以理解，为什么需要导出一个`install`方法呢？，其实`vuex`和`vue-router`一样，都是以`vue`插件的方式进行的，在`vue`官方文档已经规定在我们开发插件并导出一个对象的时候，我们需要该对象上面包含一个`install`属性，即`install`方法，首先我们看到`Store`这个类中`constructor`中的代码，至于`install`方法我们在`Store`类初始化的时候进行讲解，如下便是`Store`初始化时的代码：
```js
constructor (options = {}) {
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }

    if (__DEV__) {
      assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
      assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
      assert(this instanceof Store, `store must be called with the new operator.`)
    }

    const {
      plugins = [],
      strict = false
    } = options

    // store internal state
    this._committing = false
    this._actions = Object.create(null)
    this._actionSubscribers = []
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()
    this._makeLocalGettersCache = Object.create(null)

    // bind commit and dispatch to self
    const store = this
    const { dispatch, commit } = this
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    // strict mode
    this.strict = strict

    const state = this._modules.root.state

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreVM(this, state)

    // apply plugins
    plugins.forEach(plugin => plugin(this))

    const useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools
    if (useDevtools) {
      devtoolPlugin(this)
    }
  }
```
`constructor`接受一个`options`参数，即我们在使用`vuex`的时候实例化`Store`时传递进来的选项，默认值是一个空对象，现在我们进行一一讲解，首先看到如下部分：
```js
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }
```
以上这段代码是为了解决`vuex`(2.0.0)的一个bug才写入到`Stroe`这个类中的，可以到Github中去查询`#731`，本来这段代码是写在全局环境的，当我们使用vuex的时候会判断window.Vue是否存在，即我们是否引入了vue，如果window.Vue存在，那么就会执行install这个函数，即注释所说的，原来这段代码是这样的：
```js
    if (typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }
```
但是这么写就会存在一个问题，我们现在看install函数中的代码：
```js
export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (__DEV__) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```
首先我们看到`if`判断，当Vue存在_Vue === Vue的时候，如果在开发环境就会报错，意思是vuex已经安装了，Vue.use(Vuex)只能调用一次，即不能再调用Vue.use(Vuex)，那什么情况下会出现该错误呢？我们看到如下代码：<br/>
parent-view.html
```html
<body>
    <div id="root">
        <iframe align="center" width="100%" height="170" src="./child-view.html"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no">	
        </iframe>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script>
    new Vue({
        el:"#root"
    })
</script>
```
child-view.html
```html
<body>
	<div id="root"></div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script src="https://unpkg.com/vuex@2.0.0"></script>
<script>
	Vue.use(Vuex)
	const store = new Vuex.Store()
    new Vue({
    	el:"#root",
    })
</script>
```
如上案例，我们创建了两个文件`parent-view.html`和`child-view.html`，在`parent-view.html`中使用`<iframe>`这个标签嵌入了`child-view.html`这个文件，并且在这两个`html`文件中都引入了`vue`，我们看到在`child-view.html`文件中还引入了`vuex`，并且使用了`Vue.use(Vuex)`，那么在这个情况写就会报`install`函数中的错误提示了，那么大家思考一下为什么要做以下这个判断呢，不判断行不行呢？
```js
if (Vue && _Vue === Vue)
```
答案是不行的，因为`vue`本身是一个构造函数，它可以进行多次调用，所以为了确保`install`函数只调用一次才会进行以上判断，为了用户能在实例化`vuex.Store`之前能调用`Vue.use()`这个方法，我们将之前的判断改为如下代码，并将其写入到`Store`这个类当中，这样就可以`Store`实例化之前调用`Vue.use`这个方法了，这也是为什么要在实例化之前调用`Vue.use()`方法的原因：
```js
if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
```
我们刚刚讲完了`install`函数中`if`判断以及为什么要这样做的原因，现在我们继续往下看：
```js
Vue = _Vue
applyMixin(Vue)
```
以上就是`install`函数中剩余的代码了，首先将_Vue赋值给Vue，_Vue为install函数的一个参数，即透传过来的`window.Vue`,Vue是当前文件头部定义的一个变量，赋值完之后调用了applyMixin(Vue)这个函数，并将Vue作为参数传入，根据当前文件applyMixin函数引入路径可知，applyMixin函数所在的文件路径为当前文件目录下面的mixin.js这个文件，打开mixin.js文件我们看到如下代码：
```js
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }
  /**
   * Vuex init hook, injected into each instances init hooks list.
   */
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```



