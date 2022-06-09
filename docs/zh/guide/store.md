### 初始化
根据我们前面对入口文件的分析，我们知道了在入口文件中引入并导出了一个`Store`以及`install`，根据引入的路径找到入口文件同级目录下的`store.js`文件并可看到在该文件中导出了一个`Store`类和一个`install`方法，导出`Store`可以理解，因为这是我们在使用`vuex`的时候需要实例化的对象，那为什么需要导出一个`install`方法呢？，其实`vuex`和`vue-router`一样，都是以`vue`插件的方式进行的，在`vue`官方文档已经规定在我们开发插件并导出一个对象的时候，我们需要该对象上面包含一个`install`属性，即`install`方法，首先我们看到`Store`这个类中`constructor`中的代码，至于`install`方法我们在`Store`类初始化的时候进行讲解，如下便是`Store`初始化时的代码
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
`constructor`接受一个`options`参数，既我们在使用`vuex`的时候实例化`Store`时传递进来的选项，默认值是一个空对象，现在我们进行分步讲解，首先看到如下部分
```js
// Auto install if it is not done yet and `window` has `Vue`.
// To allow users to avoid auto-installation in some cases,
// this code should be placed here. See #731
if (!Vue && typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
```
以上这段代码是为了解决`vuex`(2.0.0)的一个bug才写入到`Stroe`这个类中的，可以到`Github`中去查询`#731`，本来这段代码是写在全局环境的，当我们使用`vuex`的时候会判断`window.Vue`是否存在，即我们是否引入了`vue`，如果`window.Vue`存在，那么就会执行`install`这个函数，即注释所说的，但是原来这段代码是其实是这样的，如下
```js
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
```
但是这么写就会存在一个问题，我们现在看`install`函数中的代码：
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
首先我们看到`if`判断，当`Vue`存在并且`_Vue === Vue`的时候，如果在开发环境就会提示报错，意思是`vuex`已经安装了，`Vue.use(Vuex)`只能调用一次，即不能再调用`Vue.use(Vuex)`，那什么情况下会出现该错误呢？我们看到如下代码
```html
<!-- parent-view.html -->
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
```html
<!-- child-view.html -->
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
以上就是`install`函数中剩余的代码了，首先将`_Vue`赋值给`Vue`，`_Vue`为`install`函数的一个参数，即透传过来的`window.Vue`,`Vue`是当前文件头部定义的一个变量，赋值完之后调用了`applyMixin(Vue)`这个函数，并将`Vue`作为参数传入，根据当前文件`applyMixin`函数引入路径可知，`applyMixin`函数所在的文件路径为当前文件目录下面的`mixin.js`这个文件，打开`mixin.js`文件我们看到如下代码
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
在该文件夹中默认导出一个函数并接收一个参数，该参数就是我们透传过来的`vue`，既我们在`store.js`中引入的`applyMixin`，根句该函数第一行代码可知首先获取的是`Vue`的版本号然后转化为数字类型并赋值给`version`这个常量，当`version>=2`时走的是`if`分支，否则走`else`分支，因为我们现在研究的是`vue2.x`版本，所以我们只需要看`if`分支内部代码即可，如下：
```js
Vue.mixin({ beforeCreate: vuexInit })    
```
如上可知，利用透传过来的`Vue`参数使用了`Vue`中的`mixin`这个方法，我们知道`Vue.mixin`注册的是一个全局混入，它将影响每一个之后创建的`Vue`实例，这也是我们在面试中经常被问的`vue`中的继承问题，当然你也可以使用`extends`或着`mixins`，ok，回归正题，依上可知`mixin`方法接收一个参数对象，该对象的一个属性就是`vue`中的钩子函数`beforeCreate`，属性值为`vuexInit`，定义在当前文件的底部，如下
```js
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
```
依据注释可知，这是为了在`Vuex`中初始化钩子，并注入到每个实例钩子函数列表当中的，我们来看如下代码：
```js
const options = this.$options
// store injection
if (options.store) {
  this.$store = typeof options.store === 'function'
    ? options.store()
    : options.store
} else if (options.parent && options.parent.$store) {
  this.$store = options.parent.$store
}
```
首先获取的是`vue`实例中的`$options`属性，该属性是`vue`的初始化选项属性，然后将该属性值赋值给了`options`这个常量，赋值给`options`这个常量之后进行判断，如果`options`这个常量中有`store`这个属性就走`if`分支，如果没有的话就走`else`分支，首先我们看到`if`分支，如果`options`中包含`store`选项那么就在当前`vue`实例上添加一个`$store`属性，如果`options.store`是一个函数，就执行`options.store()`并将返回值赋值给`this.$store`，否则将`options.store`赋值给`this.$store`，那`store`是什么呢？我们知道当我们需要在`vue`中定义一些自定义属性的时候我们只需要将属性传递给`vue`实例即可，如下：
```js
new Vue({
    name:"朱公子",
    el:"#root",
    data:{
        title:"hello"
    },
    created(){
        console.log(this.$options)//{name:"朱公子"}
    }
})
```
我们在`vue`实例当中传递了一个`name`属性，此时我们就可以在`this.$options`这个属性当中获取到，还记得我们在使用`vuex`的为了方便操作`vuex`我们是怎么做的吗？它其实和`name`这个属性一样，将`vuex`这个实例传递给`vue`实例即可，那么我们就可以`this.options`这个对象当中获取到`vuex`实例了，即我们之前提到的`store`，那我们在`vue`中操作`vuex`只需要访问`this.$store`即可，这也大大方便了我们在使用`vue`单文件组件时操作`vuex`了
讲完了`if`分支我们来看到`else if`这个分支，他的判断如下
```js
else if (options.parent && options.parent.$store)
```
那么什么时候`else if`分支中的条件成立呢？其实很简单，这其实是在我们使用`vue`组件时才会执行的判断，如下示例：
```js
const Sun = {}
const Child = {
  components:{
    Sun
  }
}
new Vue({
  store,
  el:"#root",
  components:{
    Child
  }
})
```
如上所示，我们在`vue`实例中引用了`Child`这个组件，在`Child`组件中又引用了`Sun`这个组件，这就构成一个层层嵌套的关系，那么现在我们就知道`else if`中的判断是为了什么了，首先将初始化`Vue`根组件时传入的`store`设置到`this`对象的`$store`属性上，子组件从其父组件引用`$store`属性，层层嵌套进行设置，那么现在你是不是有一个疑惑？组件啥时候变成实例了呢？其实很简单，在`vue`注册组件的时候，默认会调用`Vue.extend`这个方法，每次使用`Vue.extend`方法都会注册一个新实例，其实你也可以自己试一下在一个子组件中打印当前实例对象(this)，该实例对象下面有一个`_uid`属性，在`vue`源码中就是为了记录实例生成次数用的，该属性初始值为`0`，每生成一次实例`+1`<br/>//TODO 为什么是beforeCreate
以上便是install函数的全部内容，现在我们回到store这个类中讲解剩余的部分，如下
```js
if (__DEV__) {
  assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
  assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
  assert(this instanceof Store, `store must be called with the new operator.`)
}
```
//TODO环境变量是什么？首先判断是否在开发环境下，如果在开发环境下则执行`if`语句里面的内容，那`if`语句里面是干嘛的呢？其实是为了给用户抛出错误信息提示的，我们可以看到`if`语句块中就是将`assert`这个函数执行了三遍，该函数接受两个参数，根据顶部的引入可知，该函数存在于`src`目录下的`util.js`这个文件，我们找到该文件并找到`assert`函数如下：
```js
export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}
```
该函数接受两个参数，第一个参数为判断的条件，第二个参数是一段提示信息，如果第一个参数取反为`true`，那么就执行该`if`语句块中的代码抛出错误提示信息<br/>
现在我们讲解了`assert`函数的作用回看到如下代码：
```js
const {
  plugins = [],
  strict = false
} = options
```
利用对象解构取出了`plugins`属性和`strict`属性，并且`plugins`默认值为一个空数组，`strict`属性的默认值为`false`，我们知道这两个属性在`vuex`中的作用，当`strict`设置为`true`的时候开启严格模式，在严格模式下无论何时发生了状态变更且不是由`mutation`函数引起的，将会抛出错误，这能保证所有的状态变更都能被调试工具跟踪到，`plugins`既我们在`vuex`中提到的插件，接下来我们看到以下这一段代码
```js
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
```
根据注释可知这是初始化Store这个类的一些内部状态的，我们先看到`_modules`属性，至于其他属性我们暂时先不了解，到时使用时自然就知道其作用了，我们看到`_modules`的属性值是`ModuleCollection`的实例对象，该实例化对象接受一个参数，即我们透传过来的`options`，根据顶部的引入关系可知，`ModuleCollection`存在于`src/module/module-collection`这个文件中，在该文件中并找到ModuleCollection如下
```js
export default class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false)
  }

  get (path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }

  getNamespace (path) {
    // console.log("path",path)
    let module = this.root
    const result = path.reduce((namespace, key) => {
      module = module.getChild(key)
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
    return result
  }

  update (rawRootModule) {
    update([], this.root, rawRootModule)
  }

  register (path, rawModule, runtime = true) {
    if (__DEV__) {
      assertRawModule(path, rawModule)
    }

    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      this.root = newModule
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }

  unregister (path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]
    const child = parent.getChild(key)

    if (!child) {
      if (__DEV__) {
        console.warn(
          `[vuex] trying to unregister module '${key}', which is ` +
          `not registered`
        )
      }
      return
    }

    if (!child.runtime) {
      return
    }

    parent.removeChild(key)
  }

  isRegistered (path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]

    if (parent) {
      return parent.hasChild(key)
    }

    return false
  }
}
```
我们看到该文件导出了一个类，即我们之前遇到的`ModuleCollection`，我们先看到`constructor`中的代码，如下
```js
constructor (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false)
}
```
`constructor`接受一个参数`rawRootModule`，即我们在调用时透传过来的`options`，然后在`constructor`中调用了这个类中的`register`方法，该方法接收三个参数，分别是一个空数组，`rawRootModule`，以及一个布尔值`false`，我们找到该类中的`rigister`方法，如下
```js
register (path, rawModule, runtime = true) {
  if (__DEV__) {
    assertRawModule(path, rawModule)
  }

  const newModule = new Module(rawModule, runtime)
  if (path.length === 0) {
    this.root = newModule
  } else {
    const parent = this.get(path.slice(0, -1))
    parent.addChild(path[path.length - 1], newModule)
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, (rawChildModule, key) => {
      this.register(path.concat(key), rawChildModule, runtime)
    })
  }
}
```
首先判断是否在开发环境，如果在开发环境下，那就执行`assertRawModule`这个函数，该函数接收两个参数，分别是`path`和`rawModule`，`path`是一个空数组，`rawModule`既我们透传过来的`options`选项，`assertRawModule`函数如下
```js
function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(key => {
    if (!rawModule[key]) return
    const assertOptions = assertTypes[key]
    forEachValue(rawModule[key], (value, type) => {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      )
    })
  })
}
```
首先获取的是`assertTypes`的键值然后进行`forEach`循环，`assertTypes`如下
```js
const assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
}
```
`assertTypes`对象有三个属性，分别是`getters`、`mutations`、`actions`，`getters`的属性值为`functionAssert`，`mutations`属性值为`functionAssert`，`actions`的属性值为`objectAssert`，`functionAssert`和`objectAssert`如下所示
```js
const functionAssert = {
  assert: value => typeof value === 'function',
  expected: 'function'
}

const objectAssert = {
  assert: value => typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'),
  expected: 'function or object with "handler" function'
}
```
`functionAssert`和`objectAssert`都为对象，且对象中都包含着两个属性，分别是`assert`和`expected`，至于这两个的属性稍后我们用到时再讲，现在我们回到之前的代码，获取到`assertTypes`的键值之后返回的是一个数组，如下
```js
['getters','mutations','actions']
```
然后进行循环，我们看到循环内部的代码
```js
Object.keys(assertTypes).forEach(key => {
  if (!rawModule[key]) return
  const assertOptions = assertTypes[key]
  forEachValue(rawModule[key], (value, type) => {
    assert(
      assertOptions.assert(value),
      makeAssertionMessage(path, key, type, value, assertOptions.expected)
    )
  })
})
```
首先判断`rawModule[key]`取反是否为`true`，如果为`true`，则`return`，既`rawModule`中是否包含`getters`、`mutations`、`actions`，既我们传递的`options`是否包含这三个属性，如果包含就执行后面的代码，首先获取`assertTypes`中的`key`值，即我们之前提到的`functionAssert`或者`objectAssert`，然后赋值给`assertOptions`常量，然后执行`forEachValue`这个函数，该函数接收两个参数，分别为key对应`rawModule`中的值，既`rawModule[key]`，另一个为一个函数，我们先根据引入关系找到`forEachValue`这个函数，该函数存在于`src`目录下的`util.js`这个文件，如下
```js
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
```
该函数接收两个参数，一个是透传过来的`key`对应`rawModule`中的值，既我们在`options`中定义的`getters`、`mutations`、`actions`这三个属性对应的值，另一个为执行的函数，首先获取到`obj`的`key`值，然后进行循环并循环后的key传递给`fn`，现在我们来看第二个参数`fn`做了啥，如下便是`fn`
```js
const fn = (value, type) => {
  assert(
    assertOptions.assert(value),
    makeAssertionMessage(path, key, type, value, assertOptions.expected)
  )
}
```
首先在该函数体中调用`assert`函数，该函数接收三个参数，分别是`assertOptions`中的`assert`属性，`makeAssertionMessage`函数，`assert`函数我们之前有讲过，这里就不再多讲了，我们先来看看传递给`assert`函数的第二个参数，该参数也是一个函数，如下
```js
function makeAssertionMessage (path, key, type, value, expected) {
  let buf = `${key} should be ${expected} but "${key}.${type}"`
  if (path.length > 0) {
    buf += ` in module "${path.join('.')}"`
  }
  buf += ` is ${JSON.stringify(value)}.`
  return buf
}
```
该函数是一个接收四个参数，分别是我们透传过来的空数组path，`options`中的属性`key`值，既`getters`、`mutations`、`actions`，对应的`getters`、`mutations`、`actions`这三个属性对象中的`key`值type，对应的`getters`、`mutations`、`actions`这三个属性对象中的`key`值对应的属性值`value`以及`assertOptions`对象中的`assert`属性，该属性是一个函数，接收一个参数，然后判断该参数值是否符合其规范返回一个布尔值，其实观察这个函数可知该函数是利用传递的参数拼接成一段提示信息用的，这里我们不做过多的解释，俺相信你是能懂的，现在我们讲解完了这些我相信你应该能理解`assertRawModule`的作用了，没错就是你想的那样，它就是为了检验`getters`、`mutations`、`actions`这三个属性对象中的属性是否符合规范的，如果不符合规范就抛出一个错误，现在我们再接着看`register`中剩余的代码，如下
```js
const newModule = new Module(rawModule, runtime)
```
我们看到作者声名了一个常量`newModule`，该常量的值为一个利用`new`关键字生成的实例对象，并传递了两个参数，分别是`rawModule`和`runtime`，`rawModule`我们前面有提到过，`runtime`其实是`register`的第三个参数，默认值为`true`，因为我们在执行`rigister`函数的时候传递了第三个参数并为`false`，现在我们根据顶部的引入关系找到`Module`，如下
```js
export default class Module {
  constructor (rawModule, runtime) {
    this.runtime = runtime
    // Store some children item
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule
    const rawState = rawModule.state

    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }

  get namespaced () {
    return !!this._rawModule.namespaced
  }

  addChild (key, module) {
    this._children[key] = module
  }

  removeChild (key) {
    delete this._children[key]
  }

  getChild (key) {
    return this._children[key]
  }

  hasChild (key) {
    return key in this._children
  }

  update (rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }

  forEachChild (fn) {
    forEachValue(this._children, fn)
  }

  forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
```
根具以上可知`Module`也是一个类，根据之前我们讲解`ModuleCollection`的思路先了解类中`constructor`函数中做了什么为出发点，如下便是`constructor`的代码
```js
constructor (rawModule, runtime) {
  this.runtime = runtime
  // Store some children item
  this._children = Object.create(null)
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule
  const rawState = rawModule.state

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
}
```
首先我们可以看到先在当前类中添加了四个属性，这四个属性分别是`runtime`、`_children`、`_rawModule`以及`state`，`runtime`的值为我们透传过来的`runtime`，`_children`为一个对象，`_rawModule`为我们透传过来的`rawModule`，`state`首先判断`rawState`，`rawState`为`rowModule`中的`state`属性，然后判断`rawState是不是为`function`类型，如果是则取`rawState`的返回值，否则为直接取`rawState`，如果这些都不符合，那么`state`将为一个空对象`{}`，讲到这里我们可知`vuex`中的`state`既可以为一个对象，也可以为一个函数（牛x），现在我们讲解了`constructor`中的代码，这个时候你应该知道`new Module(rawModule, runtime)`返回值是什么了吧，假设我们有如下实例
```js
const store = new Vuex.Store({
  state:{
    boke:"vuex"
  }
})
```
那么此时返回值就为如下
```js
const newModule = {
  runtime:false,
  _children: {},
  _rawModule: {
    state:{
      book:'vuex'
    }
  },
  state:{
    book:'vuex'
  }
}
```
现在我们继续看`rgster`中的代码，如下
```js
if (path.length === 0) {
  this.root = newModule
} else {
  const parent = this.get(path.slice(0, -1))
  parent.addChild(path[path.length - 1], newModule)
}
```
首先判断`path.length`是不是等于`0`，如果等于`0`，那么就走`if`分支，反之走`else`分支，由于我们我们我们传递的`path`参数的初始值为`0`，所以一定会走`if`分支，`if`分支代码块中的实在当前类中添加了一个`root`属性，改属性的既为我们之前提到的`newModule`常量，我们接着往下看这段代码
```js
// register nested modules
if (rawModule.modules) {
  forEachValue(rawModule.modules, (rawChildModule, key) => {
    this.register(path.concat(key), rawChildModule, runtime)
  })
}
```
由注释可知，这段代码是为了注册嵌套模块的，首先判断`rawModule.modules`是否存在，如果存在就执行`if`分支代码块，在讲解这段代码之前我们先看到如下案例
```js
const moduleA = {
  state: {
    title: "this is moduleA title!"
  }
};

const store = new Vuex.Store({
  namespecd:true,
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      ++state.count;
    }
  },
  modules:{
    moduleA
  }
});
```
在这个实例中我们实例化了`Store`这个类，并在传递的`options`选项中传递了`modules`属性对象，在`vuex`的官方文档中这个属性是为了将我们传递的`options`选项分割成多个模块而存在的，我们在这段代码的顶部定义了一个`moduleA`模块，并在`modules`对象属性中引入，根据这段代码我们此时就会走`rigister`底部的`if`分支，观察`if`分支代码块中的代码，这其实是一个闭包(我滴妈呀)，首先先循环`rawModule.modules`，然后从新调用`rigister`函数，这里我们不做过多的解释，我相信你是能看懂的，不过不解释归不解释，但是有些地方我们还是需要讲的，首先是重新调用的`register`函数的第一个参数`path`，使用`.concat`方法将`moduleA`中的属性`key`值进行了处理，那么此时我们再次调用`register`函数的时候`path`的`length`属性将不再为`0`，此时就会走`else`分支，我们看到`else`分支中的代码，如下
```js
const parent = this.get(path.slice(0, -1))
parent.addChild(path[path.length - 1], newModule)
```
首先声明了一个常量`parent`，并调用当前实例中的`get`方法，我们找到当前实例中的`get`方法，如下
```js
get (path) {
  return path.reduce((module, key) => {
    return module.getChild(key)
  }, this.root)
}
```
改方法接收一个参数`path`，根据上面提到的实例，`path`应该为`['moduleA']`，但是在传参的时候调用了`slice`方法，所以此时`path`是一个空数组，所以此时调用`get`方法返回的其实就是`root`，我们继续往下看是调用了`parent`中的`addChild`方法，我们找打该方法，如下
```js
addChild (key, module) {
  this._children[key] = module
}
```
由此可知其实就是在获取的`parent`对象的`_children`对象上添加当前处理过的`moduleA`，由此根据上面提到的那个案例我们就可知`_modules`的值为如下所示
```js
store._modules = {//MoculeCollection
  root:{//Module
      runtime:false,
      _children:{
        moduleA:{//Module
          runtime:false,
          _children:{},
          _rawModule:{
            state: {
              title: "this is moduleA title!"
            }
          },
          state: {
            title: "this is moduleA title!"
          }
        },
      },
      _rawModule:{
        state: {
          count: 0
        },
        mutations: {
          increment(state) {
            ++state.count;
          }
        },
        modules:{
          moduleA
        }
      },
      state:{
        count:0
      }
  }
}
```
现在我们再回到`Store`这个类中继续往下看，如下
```js
// bind commit and dispatch to self
const store = this
const { dispatch, commit } = this
this.dispatch = function boundDispatch (type, payload) {
  return dispatch.call(store, type, payload)
}
this.commit = function boundCommit (type, payload, options) {
  return commit.call(store, type, payload, options)
}
```
由注释可知这段代码是将`dispatch`和`commit`绑定到当前`Store`这个类的，还记得`dispatch`和`commit`是什么吗我的朋友？不记得也没关系，一切包小弟身上，在我们使用`vuex`的时候，我们需要先使用`new`关键字实例化`Store`这个类，如下案例
```js
const store = new Vuex.Store({
    state:{
      count:0
    },
    mutations:{
        increment(state){
            ++state.count
        }
    }
    actions:{
      ...
    }
})
```
我们在实例化`Store`这个类的时候给他传递了一个参数，该参数是一个对象，并且对象中包含了一些属性，这些属性就是人门常说的`options`API，你也可以叫它选项API，在`vue3`中提供`composition`API，你也可以叫它组合式API，这也是`Vue2`和`Vue3`的区别，回归正题，当我们需要`state`中的状态时我们不能直接修改，而是要在`mutations`这个属性中声明方法然后调用`mutations`中的方法进行修改，如下
```js
store.commit('increment')
```
这样我们就可以修改`state`里面的状态了，那`actions`中的方法如何调用呢？如下：
```js
store.dispatch('xxx')
```
帮各位回顾了一下`vuex`中的一些使用，现在我们回到vuex源代码：
```js
const store = this
const { dispatch, commit } = this
```
首先定义了一个常量`store`，该常量就是我们使用`new`关键字返回的`Store`实例对象，然后利用对象结构的方法获取到`Store`中的两个方法，分别是`dispatch`和`commit`，这样做的目的是为了存储`store`类上的`dispatch`和`commit`，这两个方法定义在`construct`的下方，这个我们待会再讲，然后执行如下代码：
```js
this.dispatch = function boundDispatch (type, payload) {
  return dispatch.call(store, type, payload)
}
this.commit = function boundCommit (type, payload, options) {
  return commit.call(store, type, payload, options)
} 
```
我们可以看到在当前的实例对象定义了两个属性分别是`dispatch`和`commit`属性方法，并在这两个方法中调用了我们刚才结构的得到的`dispatch`和`commit`，这样我们就可以在不影响原方法的情况下进行调用了，现在我们继续往下看，如下
```js
// strict mode
this.strict = strict
const state = this._modules.root.state
```
首先在当前的类中添加`strict`属性，该属性的属性值即为我们之前讲过的严格模式，默认值是一个`false`,然后又定义了一个常量为`state`，改常量的值为我们之前讲过的`_modules`属性，我们还是以之前的案例为例，此时的`state`常量应该为如下所示
```js
const state = {
  count:0
}
```
ok，我们继续看如下代码
```js
// init root module.
// this also recursively registers all sub-modules
// and collects all module getters inside this._wrappedGetters
installModule(this, state, [], this._modules.root)
```
根据注释可知该函数主要为了初始化根模块并且递归注册所有的字模块的，我们找到`installModule`，该函数定义在当前文件的下方，如下所示
```js
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && __DEV__) {
      console.error(`[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join('/')}`)
    }
    store._modulesNamespaceMap[namespace] = module
  }

  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      if (__DEV__) {
        if (moduleName in parentState) {
          console.warn(
            `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
          )
        }
      }
      Vue.set(parentState, moduleName, module.state)
    })
  }

  const local = module.context = makeLocalContext(store, namespace, path)

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
```
该函数接收五个参数，但是我们在`constructor`中调用的时候知传递了四个参数，分别是当前`Store`、我们之前声明的常量`state`，一个空数组以及我们之前在当前`Store`中添加的`_modules`中的`root`属性，搞清楚了传递的参数现在我们来讲解`installModule`函数中的代码，让你爽到嗨，首先我们看到如下代码
```js
const isRoot = !path.length
const namespace = store._modules.getNamespace(path)
```
聪明的你观察到了 我们在代码中声明了两个常量，分别是`isRoot`和`namespace`，`isRoot`的值为一个布尔值，当`path`的`length`属性值为`0`的时候`isRoot`的属性值为true，`namespace`的属性值为当前的我们在当前类中添加的`_modules`属性中的`getNamespace`函数的返回值，根据我们之前的分析，`getNamespace`函数存在于`ModuleCollection`这个类当中，我们找到这个方法，如下
```js
getNamespace (path) {
  let module = this.root
  return path.reduce((namespace, key) => {
    module = module.getChild(key)
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
}
```
根据该函数的命名可知，聪明的你应该已经猜到该函数的作用是干嘛的吧，没错，它就是来获取命名空间用的，那各位还记得`vuex`中的命名空间是啥吗？默认情况下`action`、`mutation`和`getter`是注册在全局命名空间下的，但是当我们使用命名空间的时候`action`、`mutation`和`getter`会根据模块注册的路径调整命名，如下案例
```js
const moduleA = {
  namespaced:true
  state:{
    count:0
  }
  mutations:{
    increment(state){
      ++state.coung
    }
  }
}
// 当我们未使用命名空间时，我们访问moduleA中mutations中的incremnet方法为this.$store.commit('increment'),当我们使用命名空间时为this.$store.commit('moduleA/incremnet')
```
现在我们回顾了命名空间在`vuex`中的基本作用，我们继续看`getNamespace`函数中的代码，首先声明了一个变量`module`，然后使用了`reduce`循环`path`，由于我们传递的`path`是一个空数组，所以由此可知`getNamespace`返回的是一个空字符串，我们暂时不看循环中的代码，等用到时再讲解，现在我们继续看`installModule`函数中的代码，如下
```js
// register in namespace map
if (module.namespaced) {
  if (store._modulesNamespaceMap[namespace] && __DEV__) {
    console.error(`[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join('/')}`)
  }
  store._modulesNamespaceMap[namespace] = module
}
```
在讲解如上这段代码的时候我们，我们先看到以下这个案例
```js
const moduleA = {
    namespaced:true,
    state: {
        title: "this is moduleA title!"
    },
    mutations:{
        increment(state) {
            ++state.count;
        }
    }
}

const moduleC = {
    namespaced:true,
    state: {
        title: "this is moduleC title!"
    },
    mutations:{
        increment(state) {
            ++state.count;
        }
    }
}

const moduleB = {
    namespaced:true,
    state: {
        title: "this is moduleB title!"
    },
    mutations:{
        increment(state) {
            ++state.count;
        }
    },
    modules:{
        moduleC
    }
}
const store = new Vuex.Store({
    namespecd: true,
    state: {
        count: 0,
        foots: [
            { name: "蔬菜", id: 0 },
            { name: "水果", id: 1 },
            { name: "肉", id: 2 },
        ]
    },
    getters: {
        filterFoot: function (state, getter) {
            return state.foots.filter((foot) => foot.id > 1)
        }
    },
    mutations: {
        increment(state) {
            ++state.count;
        }
    },
    actions: {
        decrement(context) {
            --context.state.count
        }
    },
    modules:{
        moduleA,
        moduleB
    }
})
```
根据以上可知此时我们的代码是不会走`if`分支的，所以我们先不讲`if`分支中的代码，继续往下看
```js
// set state
if (!isRoot && !hot) {
  const parentState = getNestedState(rootState, path.slice(0, -1))
  const moduleName = path[path.length - 1]
  store._withCommit(() => {
    if (__DEV__) {
      if (moduleName in parentState) {
        console.warn(
          `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
        )
      }
    }
    Vue.set(parentState, moduleName, module.state)
  })
}
```
如上代码也是一个`if`判断，但是根据以上我们的分析可知此时的`!isRoot`为`false`，所以依然不会走`if`（真爽），我们继续往下看
```js
const local = module.context = makeLocalContext(store, namespace, path)
```
由上可知声明了一个常量`local`以及在`module`上添加了`context`属性，且常量和`context`属性的值都为`makeLocalContext`函数的返回值，我们找到`makeLocalContext`函数，如下
```js
function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''
  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (__DEV__ && !store._actions[type]) {
          console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (__DEV__ && !store._mutations[type]) {
          console.error(`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}
```
该函数接收三个参数，分别是当前的`Store`类，获取的命名空间值以及我们透传过来的`path`值，此时的`path`为一个空数组，首先我们看到如下代码
```js
const noNamespace = namespace === ''
const local = {
  dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
    const args = unifyObjectStyle(_type, _payload, _options)
    const { payload, options } = args
    let { type } = args

    if (!options || !options.root) {
      type = namespace + type
      if (__DEV__ && !store._actions[type]) {
        console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
        return
      }
    }

    return store.dispatch(type, payload)
  },

  commit: noNamespace ? store.commit : (_type, _payload, _options) => {
    const args = unifyObjectStyle(_type, _payload, _options)
    const { payload, options } = args
    let { type } = args

    if (!options || !options.root) {
      type = namespace + type
      if (__DEV__ && !store._mutations[type]) {
        console.error(`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`)
        return
      }
    }
    store.commit(type, payload, options)
  }
}
```
首先我们看到声明了两个常量，分别是`noNamespace`和`local`，`noNamespace`是一个布尔值，因为此时的`namespaced`是一个空字符串，所以`noNamespace`此时为`true`，local是一个对象，包含了`dispatch`和`commit`属性，当`noNamespace`为`true`时，`dispatch`和`commit`的属性值分别为为`store.dispatch`和`store.commit`，所以此时的`local`应该为如下所示
```js
const local = {
  dispatch:store.dispatch,
  commit:store.commit
}
```
我们继续往下看如下代码
```js
Object.defineProperties(local, {
  getters: {
    get: noNamespace
      ? () => store.getters
      : () => makeLocalGetters(store, namespace)
  },
  state: {
    get: () => getNestedState(store.state, path)
  }
})
```
我们看到此时我们使用`Object.defineProperties`方法再`local`，定义了多个属性，分别是`getters`和`state`，并在这两个属性对象中定义了取值函数`set`，由于此时的`noNamespace`为`true`，所以根据以上可知此时`local`对象应该如下所示
```js
const local = {
  dispatch:store.dispatch,
  commit:store.commit,
  getters:{ get: () => store.getters},
  state:{ get: () => getNestedState(store.state, path) }
}
```
现在我们接着往下看`installModule`函数中的代码
```js
module.forEachMutation((mutation, key) => {
  const namespacedType = namespace + key
  registerMutation(store, namespacedType, mutation, local)
})

module.forEachAction((action, key) => {
  const type = action.root ? key : namespace + key
  const handler = action.handler || action
  registerAction(store, type, handler, local)
})

module.forEachGetter((getter, key) => {
  const namespacedType = namespace + key
  registerGetter(store, namespacedType, getter, local)
})

module.forEachChild((child, key) => {
  installModule(store, rootState, path.concat(key), child, hot)
})
```
根据以上可知分别调用了`module`中的四个方法，分别是`forEachMutation`、`forEachAction`、`forEachGetter`、`forEachChild`，并且这四个方法中都接收一个函数作为参数，我们以`forEachMutation`函数进行讲解，找到`forEachMutation`，方法如下
```js
forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn)
  }
}
```
首先判断`this._rawModule.mutations`是否存在，如果存在则执行`if`语句块中的代码，聪明的你还是的`_rowModule`属性的值是什么吗？没错，`_rowModule`属性值就是当前模块的选项对象，我们假设该对象中存在`mutations`属性，那么就执行`if`语句块中的代码，该`if`语句块中调用了`forEachValue`函数，该函数我们已经讲解过了，这里我们不再讲解，该函数接收两个参数，第一个参数为`mutations`属性对象，第二个参数为我们传递给`forEachMutation`函数的一个参数，现在我们直接看第二个参数做了什么，如下便是我们传递的第二个参数
```js
const fn = (mutation, key) => {
  const namespacedType = namespace + key
  registerMutation(store, namespacedType, mutation, local)
}
```
该函数接收两个参数，第一个参数为我们在`mutations`属性对象中定义的方法属性值，第二个参数为我们在`mutations`属性对象中定义的方法的`key`值，我们看到该函数中首先定义了一个`namespacedType`常量，该常量的值时`namespace`和`key`的字符串拼接，我们知道此时的`namespace`为一个空值，假设我们在`mutations`属性对象中定义了一个`increment`方法，那么此时的`namespacedType`的值就为"increment"，接着我们调用了`registerMutation`方法，该方法接收四个参数，分别是当前的store、namespacedType、mutation、local，我们找到`registerMutation`方法如下
```js
function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload)
  })
}
```
首先在该函数中定义了一个`entry`常量，该常量的值对应`store._mutations[type]`属性的值，还记得`store._mutations`属性是在哪里定义的吗？没错，即我们之前提到过的定义内部状态，该属性初始化为一个空对象，所以此时的`entry`为一个空数组`[]`，接着调用了该数组的`push`方法，我们可以看到在该方法中传递了一个`wrappedMutationHandler`函数作为参数，在该函数的内部利用`.call`绑定到当前对象并执行，且在`handle`方法中传递了两个参数，分别是`local.state`和`payload`，第一个参数我们已经讲解了，第二个参数你是不是很熟悉？是不是有一种想把它的冲动呢？没错，他就是我们在调用`mutations`属性对象中的方法时传递的载核，也就是我们调用时传递的参数，讲到这里我想我们此时应该知道`_mutations`这个属性的作用了，它其实就是用来盛放我们在`mutaition`中定义的方法的，假设我们定义在mutations中的方法如下
```js
mutations:{
  increment(){}
}
```
那么此时的的`_mutations`应该为如下所示
```js
store._mutations = {
  increment:[fnctions wrappedMutationHandler(){}]
}
```
现在我们知道`forEachMutation`函数的作用了吧，其实就是将我们定义在`mutations`中的方法添加到`_mutations`这个对象中的，讲完了`forEachMutation`方法，现在我们找到`forEachGetter`方法，如下
```js
 module.forEachGetter((getter, key) => {
  const namespacedType = namespace + key
  registerGetter(store, namespacedType, getter, local)
})
```
我们可以其实可以发现，其实`forEachGetter`函数的操作顺序和`forEachMutation`函数的操作顺其实是一样的，所以我们直接找到`registerGetter`函数，如下
```js
function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (__DEV__) {
      console.error(`[vuex] duplicate getter key: ${type}`)
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
}
```
首先判断`store._wrappedGetters[type]`是否为`true`，即`store._wrappedGetters`是否存在该属性，如果存在则在开发环境下给用户提示一段错误信息，即我们定义在`getter`属性对象中的方法存在重复的，然后执行`return`，如果不存在`store._wrappedGetters`这个对象中定义该属性，且该属性的值为一个函数，改函数接收一个参数`store`，即我们透传过来的`store`，概述的内部执行`rawGetter`函数并返回`rawGetter`的返回值，`rawGetter`函数接收四个参数，分别是当前模块的`state`，当前模块的`getters`，根`state`和根`getters`，假设我们定义的`getter`如下所示
```js
getter:{
    filterFoot(){}
}
```
那么此时的的`_wrappedGetters`应该为如下所示
```js
store._wrappedGetters = {
  filterFoot:function wrappedGetter(store){} 
}
```
由此可知`_wrappedGetters`属性对昂是为了盛装我们定义在`getter`属性对象中的方法的，现在我们讲解完了`registerGetter`函数，我们接着将`registerAction`函数，如下
```js
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}
```
首先我们看到在该函数中定义了一个常量`entey`，根据之前我们所讲的可知该常量应该为一个空数组`[]`，接着使用数组的`push`方法在该数组中添加一个函数，在讲解这个函数之前我们先来简单的回顾下`vuex`中的`action`是用来干嘛的
1. Action 提交的是 mutation，而不是直接变更状态
2. Action 可以包含任意异步操作
知道了这两点，我们再来看函数中的代码，首先我们看到在该函数体先声明了一个变量`res`，该变量的值为`handle`函数执行的返回结果，该函数接收两个参数，第一个参数为一个对象，第二个参数是`payload`，即我们所说的载核，我们看到第一个参数是一个对象，聪明的你能猜到这个参数是做什么用的吗？没错，改参数就是我们在`actions`中定义方法是所说的与`store`实例具有相同方法和属性的`context`对象，具体属性我们不做过多的解释，我们接着往下看，首先判断`isPromise(res)`的返回值，我们根据顶部的引入关系找到该函数，如下
```js
export function isPromise (val) {
  return val && typeof val.then === 'function'
}
```
//TODO
该函数返回的是一个布尔值，首先判断传递`val`是否存在，然后再判断该`val`中的属性`then`是否存在并且类型为`function`，如果条件满足就返回`true`，反之返回`false`，还记得在什么情况下一个函数的返回值具有`then`方法吗？那就是在函数返回一个`promise`对象的时候，该返回值才会具有`then`方法，ok，了解了这些我们继续往下看，如果`isPromise`取反得`true`，那就说明`handle`函数的返回值不包含`then`方法，也就是说明返回值不是一个`promise`对象，此时会在`if`判断的内部调用`promise.resolve`将`res`转换为`promise`对象并重新赋值给`res`，接着又是一个`if`判断，判断`store._devtoolHook`是否为`true`，该判断我们暂时先不管，但是我可以告诉你该属性和`devtoolPlugin`插件有关，所以在讲到该插件时我们再回头看，现在你只管返回`res`即可，也的确此时的`store._devtoolHook`为`false`，走`else`分支，那么我们现在就讲解完了`registerAction`函数了，我们也了解到了`_actions`属性对象的作用，其实就是用来盛装我们在`actions`属性对象中定义的方法的，假设我们在`actions`中的定义如下
```js
actions:{
  change(){}
}
```
那么此时的`store._actions`因为为如下所示
```js
store._actions = {
  change:[function wrappedActionHandler(){}]
}
```
现在我们讲完了`forEachAction`，我们接着往下看`forEachChild`这个函数，如下
```js
module.forEachChild((child, key) => {
  installModule(store, rootState, path.concat(key), child, hot)
})
```
其实你观察该函数你也大概能查到该函数的作用了吧，没错，其实该函数就是为了递归调用`installModule`函数的，以上面我们提到的案例为例，我们在`modules`属性中传递了一个`moduleA`模块，那么此时`store._modules.root._children`就会包含处理过的`moduleA`，如下所示
```js
_children:{
  moduleA:{//Module
    namespaced:true,
    runtime:false,
    _children:{},
    _rawModule:{
      state: {
        title: "this is moduleA title!"
      }
    },
    state: {
      title: "this is moduleA title!"
    }
  },
}
```
我们观察`forEachChild`参数函数体中的代码，在调用`installModule`函数的时候只有第三个和第四个参数有所改变，根据上面说的案例可知此时的`path`应该为`[moduleA]`，`child`就为`_children`中`moduleA`中的属性值，既然此时的`path`不再是一个空数组，那么可知`isRoot`此时就为`false`，那么此时就会走如下这段代码
```js
// set state
if (!isRoot && !hot) {
  const parentState = getNestedState(rootState, path.slice(0, -1))
  const moduleName = path[path.length - 1]
  store._withCommit(() => {
    if (__DEV__) {
      if (moduleName in parentState) {
        console.warn(
          `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
        )
      }
    }
    Vue.set(parentState, moduleName, module.state)
  })
}
```
首先声明了一个常量一个常量`parentState`，改常量的值为`getNestedState`函数的返回值，我们找到该方法如下所示
```js
function getNestedState (state, path) {
  return path.reduce((state, key) => {
    return state[key]
  }, state)
}
```
该函数接收两个参数，第一个参数是透传过来的`state`，第二个参数为`path`，根据上面提到的案例可知我们在全局全局注册了`moduleA`和`moduleB`两个模块，然后又在`moduleB`中注册了`moduleC`，假设我们此时执行到了`moduleC`这个模块，那么此时的`path`应该为`[moduleB，moduleC]`，但是因为我们在传参的时候调用了`.slice`方法，所以`path`应该为`[moduleB]`，所以根据以上所述，那么此时`getNestedState`的返回结果为如下所示
```js
const parentState = {
  title:'this is moduleB title!',
  moduleC:{xxx}
}
```
所以我们现在就知道`getNestedState`函数的作用是为了获取父级模块中的`state`的，现在我们继续往下看，定义了一个常量`moduleName`，该常量的结果为当前模块的名称，也就是`path[path.length-1]`，假设我们现在在处理c模块，那么此时的`moduleName`的值就为`moduleC`，ok，我们现在继续往下看执行的是如下代码
```js
store._withCommit(() => {
  if (__DEV__) {
    if (moduleName in parentState) {
      console.warn(
        `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
      )
    }
  }
  Vue.set(parentState, moduleName, module.state)
})
```
如上所示执行了当前`store`类中的`_withCommit`方法，该方法接收一个函数作为参数，我们先找到`_withCommit`函数，如下所示
```js
_withCommit (fn) {
  const committing = this._committing
  this._committing = true
  fn()
  this._committing = committing
}
```
首先保存当前`store`中的`_committing`属性并赋值给`committing`常量，改属性定义在顶部，初始值为`false`，然后将当前的`store`属性设置为`true`，再执行我们传递过来的函数`fn`，但是这样做的意义何在呢？等我们讲到开启严格模式时再来将该函数存在的意义，现在我们先来将`fn`，`fn`如下所示
```js
const fn = () => {
  if (__DEV__) {
    if (moduleName in parentState) {
      console.warn(
        `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
      )
    }
  }
  Vue.set(parentState, moduleName, module.state)
}
```
其实这段代码的作用很简单，就是利用`Vue.set方法`将当前模块添加到父级模块的`state`属性对象中的，如果父级模块的`state`属性对象中存在与当前需要添加模块相同的名称，那么就会给用户一段警告，讲完了这里`installModule`函数也讲的差不多了，但是还有最后一段代码没有讲，如下所示
```js
if (module.namespaced) {
  if (store._modulesNamespaceMap[namespace] && __DEV__) {
    console.error(`[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join('/')}`)
  }
  store._modulesNamespaceMap[namespace] = module
}
```
首先判读`module.namespaced`是否为`true`，即我们在模块中是否将`namespaced`设置为了`true`，如果设置为`true`，那么当前模块就会启用命名空间，假设我们当前设置为`true`，那么此时就会执行`if`语句中的代码，首先判断`store`中的`_modulesNamespaceMap`是否存在当前的获取的命名空间，如果存在并且在开发环境下，那么就会在终端给用户发送一段错误提示，如果不存在那么就会在`_modulesNamespaceMap`将当前获取的命名空间作为属性名称，当前的模块作为属性值进行设置，到此为之我们就将`installModule`函数中的所有内容都讲完了(费了老大劲了)，现在我们来总结一些`installModule`函数做了哪些事，有以下几点
1. 获取模块的命名空间并在`_modulesNamespaceMap对象中进行设置
2. 将当前模块设置到父级模块的`state`属性对象中
3. 当命名空间存在是重新定义`store`中的`dispatch`等方法
4. 将我们设置`mutations`，`getter`，`actions`中的方法分别添加到`store`中的`_mutations`、`_wrappedGetters`、`_actions`这几个属性对象中

现在我们讲解完了`installModule`函数，聪明的你是否看懂了呢？没看懂没关系，多看几遍就行，现在我们还是继续往下讲解吧，如下
```js
resetStoreVM(this,state)
```
根据以上我们找`resetStoreVM`函数，该函数定义子啊当前文件的下方
```js
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm
  // bind store public getters
  store.getters = {}
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null)
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```
如上所示，我们先设置了一个常量`oldVm`，该常量的值为`store._vm`，聪明的你知道此时的`store._vm`是什么吗？没错，此时的`_vm`属性应该为`undefind`，因为我们压根没有初始化该值，那这样做的目的只有一个原因，那就是`resetStoreVM`函数肯定在别处调用了，该常量是用来保存上一次初始化的`_vm`属性的，既然是保存上一次的，那么肯定在`resetStoreVM`函数中就会初始化该属性，观察`resetStoreVM`函数也的确发现`store._vm`是一个`vue`实例而来的，现在我们继续往下看，如下所示
```js
// bind store public getters
store.getters = {}
// reset local getters cache
store._makeLocalGettersCache = Object.create(null)
const wrappedGetters = store._wrappedGetters
const computed = {}
```
接着在`store`中添加了两个属性，分别是`getters`和`_makeLocalGettersCache`，`_makeLocalGettersCache`属性在调用`resetStoreVM`有被初始化过，所以这一次是为了重置用的，接着声明了两个常量，分别是`wrappedGetters`和`computed`，`wrappedGetters`的常量值为`store._wrappedGetters`，还记得`_wrappedGetters`是做什么用的吗？它是用来盛载我们在`getter`中定义的函数用的，不记得的话就往回翻翻，`computed`常量的值为一个空对象，现在我们接着往下看，如下所示
```js
forEachValue(wrappedGetters, (fn, key) => {
  // use computed to leverage its lazy-caching mechanism
  // direct inline function use will lead to closure preserving oldVm.
  // using partial to return function with only arguments preserved in closure environment.
  computed[key] = partial(fn, store)
  Object.defineProperty(store.getters, key, {
    get: () => store._vm[key],
    enumerable: true // for local getters
  })
})
```
首先循环了`wrappedGetters`这个对象，至于`forEachValue`函数我们不再多讲，我们直接看到传递给`forEachValue`函数的第二个参数，该参数是一个函数，该函数接收两个参数，第一个参数`fn`，即为`wrappedGetters`中的属性值，`key`为`wrappedGetters`中键值，现在我们看向函数体，首早`computed`以`key`为属性名称添加属性，且属性值为`partial`函数的返回值，根据顶部的引入关系我们找到`partial`函数如下所示
```js
export function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}
```
我们观察该函数可知，其实他就是吧`fn`包裹在另一个函数中，然后将`arg`作为参数传递给`fn`，但是你要知道此时的`fn`并未执行，只有当`fn`的外层函数执行时才会执行，所以我们知道`computed`对象中的属性就是一个包裹了`fn`的函数，而这样做的目的是为了若是直接使用内联函数会导致保存oldVm的闭包，所以源码中定义了partial函数，用来返回只保留闭包环境中的参数的函数，使用computed，是为利用其惰性缓存机制，但是现在并不是，我们继续往下看，接着使用`Object.defineProperty`将`store.getters`从数据属性转换为了`访问器属性，并将`store.getters`中的取值函数设置为`() => store._vm[key]`，所以当我们获取`store.getters`中的属性时起时就是在获取` store._vm[key]`，并将`enumerable`属性设置为`true`，意为可遍历的，这样做的目的起时是为了我们可以同过`store.getters.xxx`进行访问用的，接着我们来看如下这段代码
```js
const silent = Vue.config.silent
Vue.config.silent = true
store._vm = new Vue({
  data: {
    $$state: state
  },
  computed
})
Vue.config.silent = silent
```
观察这段代码起时就是我们在之前所说的为了初始化或者重置`store._vm`属性的，首先定义了一个常量`silent`，该常量的值为`Vue.config.silent`，然后将`Vue.config.silent`，设置为`true`，还记的`Vue.config.silent`时干嘛的吗？没错，就是你想的那样，它是为了控制`vue`给我们是否提供日志与警告的，而这么做的目的就是为了为防止用户添加了一些时髦的全局mixins而出现日志与警告，创建完成后，则设置回原来的值，现在我们来看重置`store._vm`的这段代码，首先`store._vm`的属性值就是一个`vue`实例，然后在该实例的`data`对象中添加`$$state`属性，该属性的属性值为`state`，那么这样就可以达到存储状态树的目的，且都是为响应式的，然后在computed
传入`vue`实例中，那么这样一来`computed`常量就为了`vue`中的计算属性，以实现getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算，改属性会被定义到`store._vm`上面，这也是为什么将`store.getters`中的取值函数设置为`() => store._vm[key]`的原因，讲完了这段代码其实`resetStoreVM`函数就讲解的差不多了，但是还有一些未讲完，我们接着往下看
```js
if (store.strict) {
  enableStrictMode(store)
}
```
首先是一个`if`判断，`store.strict`为`true`时就执行`enableStrictMode`，聪明的你知道`store.strict`在什么情况下为`true`吗？没错，就是在我们将`vuex`设置为严格模式时它才为`true`的，默认为`false`,现在我们假设它现在为`true`，既然为`true`，那么就会执行`enableStrictMode`函数，我们找到`enableStrictMode`函数如下所示
```js
function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, () => {
    if (__DEV__) {
      assert(store._committing, `do not mutate vuex store state outside mutation handlers.`)
    }
  }, { deep: true, sync: true })
}
```
我们直接看到该函数的函数体，利用`store._vm.$watch`去监听`this._data.$$state`，即监听`vuex`中的状态树，当在开发环境下并且`store._committing`为`false`时就会给用户在控制台发送一段错误提示，即大概的意思为`vuex`的状态必须利用`mutation`进行改变，否则就会发生报错，那你现在应该知道`_withCommit`函数的作用了吧，其实就是为了状态变更而存在的，因为我们在源码中难免需要变更状态，所以此时就会使用`_withCommit`函数进行变更，而外部在使用`vuex`时，并且在严格模式下时，此时就会调用`enableStrictMode`函数，因为每次`vuex`内部调用完`_withCommit`都会将`store._committing`重置为`false`，所以此时如果在外部不使用`mutation`中的处理函数变更状态时就会报错了，讲完了这些我们继续往下看
```js
if (oldVm) {
  if (hot) {
    // dispatch changes in all subscribed watchers
    // to force getter re-evaluation for hot reloading.
    store._withCommit(() => {
      oldVm._data.$$state = null
    })
  }
  Vue.nextTick(() => oldVm.$destroy())
}
```
我们看到如是代码，首先判断`oldVm`是否存在，什么时候存在呢？很简单，就是在`vuex`内部多次调用`resetStoreVM`函数时，除了第一次之外`oldVm`都是存在的，现在我们假设它存在，接着又判断`hot`是否为`true`，你们还对`hot`有什么印象吗？不记得没关系，我现在说个你听，`Vuex`支持在开发过程中热重载`mutation`、`module`、`action`和`getter`，但我们启用热重载时，`hot`就会为`true`，现在假设你在使用`vuex`的时候启用了热重载，现在我们看`if`代码块中的中的代码，很显然，此时又调用了`store._withCommit`，那么也就意味着状态需要发生变更，我们猜测的也并没有错，在`store._withCommit`传入的参数函数中，也的确是将`oldVm._data.$$state`设置为`null`，而这样做的目的是为了对所有订阅的观察者发送变更，强制getter重新评估，以便进行热重重载，接着就使用`oldVm.$destroy()`方法销毁旧实例，自此`resetStoreVM`中的所有内容就都讲完了，现在我们来总结一下`resetStoreVM`函数做了哪些事
1. 在`store`中添加了两个属性`_vm`属性
2. 让getter在通过属性访问时作为Vue的响应式系统的一部分缓存其中<br/>

总结完了我们继续往下看，再坚持一下，坚持就胜利啊朋友，看吧看吧，如下所示
```js
plugins.forEach(plugin => plugin(this))
```
这一行代码很简单，就是循环`plugins`然后执行，友情提醒一下，`plugins`就是我们在`vuex`中定义的`plugins`选项属性，这里我们不再多讲我们继续玩下看如下代码
```js
const useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools
if (useDevtools) {
  devtoolPlugin(this)
}
```
首先定义了一个常量`useDevtools`，假如`options.devtools`不为`undefined`那么`useDevtools`的值就为`options.devtools`，否则为`Vue.config.devtools`，`devtools`若在`vuex`中设置为`true`，则启用`devtoolPlugin`插件，否则不启用，至于`devtoolPlugin`插件我们分开讲，而至于`devtools`属性官方文档说的很清楚了这里不再多讲，至此我们`vuex`所有的初始化内容就都讲完了，恭喜大家













