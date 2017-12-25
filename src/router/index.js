import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/common/Home.vue'
import Default from '../components/page/Default.vue'
import Company from '../components/page/Company.vue'
import Customer from '../components/page/Customer.vue'
import Login from '../components/page/Login.vue'
import store from '../vuex/store'
import * as types from '../vuex/types'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/default',
            meta: {
                requireAuth: false,//
            },
            //component: resolve => require(['../components/common/Home.vue'], resolve),
            component: Home,
            children:[
                {
                    path: '/',
                    meta: {
                        requireAuth: true, //先改一个为false
                    },
                    component: Default
                },
                {
                    path: '/company',
                    meta: {
                        requireAuth: true,
                    },
                    component: Company
                },
                {
                    path: '/customer',
                    meta: {
                        requireAuth: true,
                    },
                    component: Customer
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
    ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('ms_token')) {
    let user = {
        username: window.localStorage.getItem('ms_username'),
        token: window.localStorage.getItem('ms_token')
    }
    store.commit(types.LOGIN, user);
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.user.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;