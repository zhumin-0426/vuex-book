## 找到我们的入口文件
由前面提到的，我们分析了package.json文件以及rollup.config.js文件，根据rollup.config.js这个配置文件不难找出入口文件有两个，我们来看到以下代码行：
```js {1,3}
    { input: 'src/index.js', file: 'dist/vuex.esm-browser.js', format: 'es', browser: true, env: 'development' },
    ...
    { input: 'src/index.cjs.js', file: 'dist/vuex.cjs.js', format: 'cjs', env: 'development' }
```
根据这两行代码不难看出入口文件包括src目录下的index.js文件和index.cjs.js文件，我们先不管index.cjs.js文件，后续我们再进行补充，暂时先看src目录下的index.js文件，如下：
```js
    import { Store, createStore } from './store'
    import { storeKey, useStore } from './injectKey'
    import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from './helpers'
    import { createLogger } from './plugins/logger'

    export default {
        version: '__VERSION__',
        Store,
        storeKey,
        createStore,
        useStore,
        mapState,
        mapMutations,
        mapGetters,
        mapActions,
        createNamespacedHelpers,
        createLogger
    }

    export {
        Store,
        storeKey,
        createStore,
        useStore,
        mapState,
        mapMutations,
        mapGetters,
        mapActions,
        createNamespacedHelpers,
        createLogger
    }

```
