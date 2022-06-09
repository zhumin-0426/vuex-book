:::tip 友情提示
该篇章主要是讲述`vuex`中的实例方法，可对照`vuex`的`api`文档，但是我们目前只讲解`commit`方法，其它的方法后续再添加
:::
### commit
`commit`方法如下所示
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
首先我们看到`commit`方法接受三个参数，分别是`_type`、`_payload`、`_options`，在了解这三个参数代表着什么之前我们先来回顾下`commit`的使用风格，`commit`的使用风格有两种形式
```js
//第一种形式
store.commit('increment',10)
// 第二种形式
store.commit({
  type:"increment",
  amount:10
})
```
了解完`commit`的使用风格之后我们在来看如下代码
```js
const {
    type,
    payload,
    options
} = unifyObjectStyle(_type, _payload, _options)
```
利用对象结构的方法声明了三个常量，分别是`type`、payload、payload，这三个常量的值是从`unifyObjectStyle`函数的返回值中进行解构的，我们找到`unifyObjectStyle`函数如下所示
```js
function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }

  if (__DEV__) {
    assert(typeof type === 'string', `expects string as the type, but found ${typeof type}.`)
  }

  return { type, payload, options }
}
```
首先是一个判断，如果`isObject(type)`和`type.type`都为真的时候就走`if`判断，聪明的你知道什么时候为真吗？没错，就是我们上面说的`commit`有两种使用风格的第二种风格对象风格，假设我们现在使用的是第二种风格，那么此时`payload`就赋值给`options`，`type`就赋值给`payload`，`type.type`就赋值给`type`，但是现在你就又个疑问了？这个`options`是什么呢？其实它是一个旧版本中的提供的一个选项，现在我们打开`test/unit/store.spec.js`文件找到如下这段代码
```js {9}
it('should warn silent option depreciation', () => {
    jest.spyOn(console, 'warn').mockImplementation()

    const store = new Vuex.Store({
        mutations: {
        [TEST] () {}
        }
    })
    store.commit(TEST, {}, { silent: true })

    expect(console.warn).toHaveBeenCalledWith(
        `[vuex] mutation type: ${TEST}. Silent option has been removed. ` +
        'Use the filter functionality in the vue-devtools'
    )
})
```
我们看到高量部分这段代码，此时他给`commit`传递了第三个参数，且第三个参数是一个对象，对象中有一个`silent`属性，该属性是干啥的呢？其实就是为了在使用`commit`方法时在控制太给用户提供一个安全提示的，但是现在该选项已经删除了，至于一段代码的作用也就是来测试这第三个参数的，这里我们不过多的讲解，等你学完了`jest`自然就能看懂了，ok，现在我们知道了第三个选项是什么，那我们就接着`unifyObjectStyle`往下看，判断在如果在开发环境下，如果`type`的类型不是字符串那么就会报错，最后将这三个参数以对象的形式返回，讲完了`unifyObjectStyle`函数，我们发现其实他的作用就是同意风格的，不管你是不是用的第一种风格，在`vuex`内部都会处理为第一种风格，现在我们接着`commit`函数往下看，如下所示
```js
this._withCommit(() => {
    entry.forEach(function commitIterator (handler) {
    handler(payload)
    })
})
```
我们又看到了`_withCommit`函数，那么不用讲这段代码肯定是用来改变`vuex`中的状态的，我们直接看给`_withCommit`传递的函数参数中的代码，首先是循化`entry`，那么聪明的你知道`entry`是什么吗？不知道没关系我们先来看一下这个例子
```js
mutations:{
    increment(){}
}
```
假设我们在`mutations`中定义了一个`increment`方法，那么此时`_mutations`应该是什么样子呢？如下所示
```js
_mutations = {
    increment:[function  wrappedMutationHandler(){}]
}
```
所以`entry`就是根据我们传递的`type`获取到的方法，那此时你又会有一个项目，为什么`_mutations`中的`increment`属性值是一个数组呢？其实很简单，假设你在子模块中定义了相同的方法名称时此时`increment`就会存在多个函数了，假如你想区分开你可以在模块中使用命名空间的形式，如果不区分的话那么模块中的相同名称方法则都会执行，现在我们讲完了`entry`其实你就能明白上面的那段代码了，它的目的就是为了执行我们在`mutations`中定义的方法的，从而改变状态，现在我们继续往下看
```js
this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(sub => sub(mutation, this.state))
```
这段代码是用来干嘛的呢？灵机一动的我发现其实这是我们在`vuex`定义插件属性时才会用到的，我们看下下面这段代码是如何定义插件的，然后一步步讲解
```js
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}
```
这就是我们定义的一个插件，我们发现`vuex`中的插件其实就是一个函数，该函数接收唯一的`store`作为参数，然后`store`初始化后就调用了`store.subscribe`，该实例方法接收一个函数作为参数，当我们每次利用`mutations`改变状态后就会调用该函数，现在我们`vuex`中找到该方法，如下
```js
subscribe (fn, options) {
    return genericSubscribe(fn, this._subscribers, options)
}
```
我们看到该函数接收两个参数，那第一个参数`fn`就是我们传递的fn，那第二个参数是什么(搞我？你是不是在搞我)？，我估计应该和`{prepend:true}`，因为我是根据`genericSubscribe`函数得出的结论，现在我们还是接着往下看，接着执行了`genericSubscribe`函数，第一个参数就是我们传递的函数，第二个参数为`this._subscribers`，它定义在顶部，初始值为一个空数组，我们找到该函数如下
```js
function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn)
  }
  return () => {
    const i = subs.indexOf(fn)
    if (i > -1) {
      subs.splice(i, 1)
    }
  }
}
```
其实这段代码很简单，首先判读`subs.indexOf(fn) < 0`，即`subs`中是否存在`fn`，接着又判断`options && options.prepend`，很显然我们在调用的时候是没有传递的，所以此时会执行`subs.push(fn)`，将`fn`添加到`_subscribers`的尾部，但是当我们传递了第三个参数，并让它为`{prepend:true}`，所以此时就会执行subs.unshift(fn)，将`fn`添加到`_subscribers`的头部，这么做的目的其实符合`first in last out`或者`last in first out`，接着返回一个函数，而这个函数的作用就是删除`_subscribers`数组中我们添加的`fn`的，讲完了这些我们回到`commit`方法中
```js
 this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(sub => sub(mutation, this.state))
```
首先是使用`.slice`对`_subscribers`进行一个浅复制，然后执行循环，循环出来的`sub`即是我们传递给`store.subscribe`的参数，这样就达到了前面所说的，每次mutation之后调用，现在讲完了这里
commit方法就讲的差不多了，还剩最后一段代码，如下
```js
if (
      __DEV__ &&
      options && options.silent
) {
    console.warn(
    `[vuex] mutation type: ${type}. Silent option has been removed. ` +
    'Use the filter functionality in the vue-devtools'
    )
}
```
这段代码不用多讲，其实就是为了提示你当传递第三个参数的时候会提示你这个选项已经移除了，至此`commit`方法就已经全部讲完了，是不是觉得很简单呢？，现在我们来回顾下`commit`做了哪些事
1. 执行`mutations`中我们定义的改变状态的方法
2. 执行我们传递给`store.subscribe`的函数参数，倒序执行或者正序执行