import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { loadFonts } from './plugins/webfontloader'
import vuetify from './plugins/vuetify'
import jwt_decode from 'jwt-decode'
import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

const routers = ['Login', 'Registration', 'user', 'admin'];

const noAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    if(!to.meta.needsAuth && !store.state.jwt.token && routers.indexOf(to.name as string) !== -1)
        return next();
    else
        return next('/login')
}

const check = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if(store.state.jwt.token !== null){
        const decoded:any = jwt_decode(store.state.jwt.token);
        const time = decoded?.exp > new Date().getTime() / 1000
        if(to.meta.needsAuth && time)
            return next();
        if(!to.meta.needsAuth && time)
            return next('/');
        else if(decoded.exp && !time){
            Promise.all([store.dispatch('deleteToken'), store.dispatch('checkLogin')]).then(()=> check(to, from, next))
        }
    }else if(store.state.jwt.check)
        return noAuth(to, from, next)
}

router.beforeEach((to, from, next) => {
    if(store.state.jwt.token === null && !store.state.jwt.check)
        Promise.all([store.dispatch('checkLogin')]).then(() => check(to, from, next))
    else
        check(to, from, next)
});

loadFonts()
createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
