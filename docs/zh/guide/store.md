### 初始化
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
在该文件夹中默认导出一个函数并接收一个参数，该参数就是我们透传过来的`vue`，即我们在`store.js`中引入的`applyMixin`，根句该函数第一行代码可知首先获取的是Vue的版本号然后转化为数字类型并赋值给`version`这个常量，当version>=2时走的是if分支，否则走else分支，因为我们现在研究的是vue2.x版本，所以我们只需要看if分支内部代码即可，如下：
```js
Vue.mixin({ beforeCreate: vuexInit })    
```
如上可知，利用透传过来的Vue参数使用了Vue中的mixin这个方法，我们知道Vue.mixin注册的是一个全局混入，它将影响每一个之后创建的Vue实例，这也是我们在面试中经常被问的vue中的继承问题，当然你也可以使用extends或着mixins，ok，回归正题，依上可知mixin方法接收一个参数对象，该对象的一个属性就是vue中的钩子函数beforeCreate，属性值为vuexInit，定义在当前文件的底部，如下：
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
依据注释可知，这是为了在Vuex中初始化钩子，并注入到每个实例钩子函数列表当中的，我们来看如下代码：
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
首先获取的是vue实例中的$options属性，该属性是vue的初始化选项属性，然后将该属性值赋值给了options这个常量，赋值给options这个常量之后进行判断，如果options这个常量中有store这个属性就走if分支，如果没有的话就走else分支，首先我们看到if分支，如果options中包含store选项那么就在当前vue实例上添加一个$store属性，如果options.store是一个函数，就执行options.store()并将返回值赋值给this.$store，否则将options.store赋值给this.$store，那store是什么呢？我们知道当我们需要在vue中定义一些自定义属性的时候我们只需要将属性传递给vue实例即可，如下：
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
我们在vue实例当中传递了一个name属性，此时我们就可以在this.$options这个属性当中获取到，还记得我们在使用vuex的胃了方便操作vuex我们是怎么做的吗？它其实和name这个属性一样，将vuex这个实例传递给vue实例即可，那么我们就可以this.options这个对象当中获取到vuex实例了，即我们之前提到的store，那我们在vue中操作vuex只需要访问this.$store即可，这也大大方便了我们在使用vue单文件组件时操作vuex了
讲完了if分支我们来看到else if这个分支，他的判断如下：
```js
else if (options.parent && options.parent.$store)
```
那么什么时候else if分支中的条件成立呢？其实很简单，这其实是在我们使用vue组件时才会执行的判断，如下示例：
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
如上所示，我们在vue实例中引用了Child这个组件，在Child组件中又引用了Sun这个组件，这就构成一个层层嵌套的关系，那么现在我们就知道else if中的判断是为了什么了，首先将初始化Vue根组件时传入的store设置到this对象的$store属性上，子组件从其父组件引用$store属性，层层嵌套进行设置，那么现在你是不是有一个疑惑？组件啥时候变成实例了呢？其实很简单，在vue注册组件的时候，默认会调用Vue.extend这个方法，每次使用Vue.extend方法都会注册一个新实例，其实你也可以自己试一下在一个字组件中打印当前实例对象(this)，该实例对象下面有一个_uid属性，在vue源码中就是为了记录实例生成次数用的，该属性初始值为0，每生成一次实例+1<br/>
那么现在我们来思考一个问题，为什么在使用Vue.mixin这个方法的时候传入的是beforeCreate，其他的不行吗？//TODO
以上便是install函数的全部内容，现在我们回到store这个类中讲解剩余的部分，如下
```js
if (__DEV__) {
  assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
  assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
  assert(this instanceof Store, `store must be called with the new operator.`)
}
```
//TODO环境变量是什么？首先判断是否在开发环境下，如果在开发环境下则执行if语句里面的内容，那if语句里面是干嘛的呢？其实是为了给用户抛出错误信息提示的，我们可以看到if语句块中就是将assert这个函数执行了三遍，该函数接受两个参数，根据顶部的引入可知，该函数存在于src目录下的util.js这个文件，我们找到该文件并找到assert函数如下：
```js
export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}
```
该函数接受两个参数，第一个参数为判断的条件，第二个参数是一段提示信息，如果第一个参数取反为true，那么就执行该if语句块中的代码抛出错误提示信息<br/>
现在我们讲解了assert函数的作用回看到如下代码：
```js
const {
  plugins = [],
  strict = false
} = options
```
利用对象解构取出了plugins属性和strict属性，并且plugins默认值为一个空数组，strict属性的默认值为false，我们知道这两个属性在vuex中的作用，当strict设置为true的时候开启严格模式，在严格模式下无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误，这能保证所有的状态变更都能被调试工具跟踪到，接下来我们看到以下这一段代码
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
根据注释可知这是初始化Store这个类的一些内部状态的，我们先看到_modules属性，至于其他属性我们暂时先不了解，到时使用时自然就知道其作用了，我们看到_modules的属性值是ModuleCollection的实例对象，该实例化对象接受一个参数，即我们透传过来的options，根据顶部的引入关系可知，ModuleCollection存在于`src/module/module-collection`这个文件中，在该文件中并找到ModuleCollection如下：
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
我们看到该文件导出了一个类，即我们之前遇到的ModuleCollection，我们先看到constructor中的代码，如下：
```js
constructor (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false)
}
```
constructor接受一个参数rawRootModule，即我们在调用时透传过来的options，然后在constructor中调用了这个类中的register方法，该方法接收三个参数，分别是一个空数组，rawRootModule，以及一个布尔值false，我们找到该类中的rigister方法，如下：
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
TODO
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
由注释可知这段代码是将dispatch和commit绑定到当前Store这个类的，还记得dispatch和commit是什么吗我的朋友？不记得也没关系，一切包小弟身上，在我们使用vuex的时候，我们需要先使用new关键字实例化Store这个类，如下案例：
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
我们在实例化Store这个类的时候给他传递了一个参数，该参数是一个对象，并且对象中包含了一些属性，这些属性就是人门常说的options API，你也可以叫它选项API，在vue3中提供composition API，你也可以叫它组合式API，这也是Vue2和Vue3的区别，回归正题，当我们需要state中的状态时我们不能直接修改，而是要在mutations这个属性中声明方法然后调用mutations中的方法进行修改，如下
```js
    store.commit('increment')
```
这样我们就可以修改state里面的状态了，那actions中的方法如何调用呢？如下：
```js
   store.dispatch('xxx')
```
帮各位回顾了一下vuex中的一些使用，现在我们回到vuex源代码：
```js
    const store = this
    const { dispatch, commit } = this
```
首先定义了一个常量store，该常量就是我们使用new关键字返回的Store实例对象，然后利用对象结构的方法获取到Store中的两个方法，分别是dispatch和commit，这样做的目的是为了存储store类上的dispatch和commit，这两个方法定义在construct的下方，这个我们待会再讲，然后执行如下代码：
```js
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    } 
```
我们可以看到在当前的实例对象定义了两个属性分别是dispatch和commit属性方法，并在这两个方法中调用了我们刚才结构的得到的dispatch和commit，这样我们就可以在不影响原方法的情况下进行调用了，现在我们继续往下看，如下：
```js
installModule(this, state, [], this._modules.root)
```
调用了installModule方法，调用该方法时传递了四个参数，参数意义（//TODO），该定义在当前文件的的下方，找到该方法如下所示便是installModule方法的全部内容：
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













