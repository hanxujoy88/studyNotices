import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = [];

const routerContext = require.context('./', true, /index\.js$/)
routerContext.keys().foreach(router => {
    //如果是根目录的index.js、不处理
    if(router.startsWith('./index')) {
        return
    }
    const routerModule = routerContext(router)

    /* 
    *  兼容 import export 和 require module.export 两种规范
    */

    router = [...routes, ...(routerModule.default || routerModule)]
})

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes 
})