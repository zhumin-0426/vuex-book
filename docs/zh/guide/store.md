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









```js
commit (_type, _payload, _options) {
  // check object-style commit
  const {
    type,
    payload,
    options
  } = unifyObjectStyle(_type, _payload, _options)

  const mutation = { type, payload }
  const entry = this._mutations[type]
  if (!entry) {
    if (__DEV__) {
      console.error(`[vuex] unknown mutation type: ${type}`)
    }
    return
  }
  this._withCommit(() => {
    entry.forEach(function commitIterator (handler) {
      handler(payload)
    })
  })

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(sub => sub(mutation, this.state))

  if (
    __DEV__ &&
    options && options.silent
  ) {
    console.warn(
      `[vuex] mutation type: ${type}. Silent option has been removed. ` +
      'Use the filter functionality in the vue-devtools'
    )
  }
}
```
首先我们看到commit方法接受三个参数，分别是_type、_payload、_options，在了解这三个参数代表着什么之前我们先来回顾下commit的使用风格，commit的使用风格有两种形式：
```js
//第一种形式
store.commit('increment',10)
// 第二种形式
store.commit({
  type:"increment",
  amount:10
})
```
了解完commit的使用风格之后我们在来看如下代码
```js
  const {
    type,
    payload,
    options
  } = unifyObjectStyle(_type, _payload, _options)
```













