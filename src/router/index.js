import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/common/Home.vue'
import Default from '../components/page/Default.vue'
import Company from '../components/page/Company.vue'
import Customer from '../components/page/Customer.vue'
import Product from '../components/page/Product.vue'
import Order from '../components/page/Order.vue'
import Distributer from '../components/page/Distributer.vue'
import DistributionForm from '../components/page/DistributionForm.vue'
import Summary from '../components/page/Summary.vue'
import OperationLog from '../components/page/OperationLog.vue'
import Dashboard from '../components/page/Dashboard.vue'
import AdminUser from '../components/page/AdminUser.vue'
import NoPermission from '../components/page/NoPermission.vue'
import NoPage from '../components/page/404.vue'
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
                linkActiveClass: 'active'
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
                    name: 'company',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: Company
                },
                {
                    path: '/customer',
                    //path: '/customer/:id',
                    name: 'customer',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: Customer
                },
                {
                    //path: '/product',
                    path: '/product/:type',
                    name: 'product',
                    linkActiveClass: 'active',
                    history: false,
                    meta: {
                        requireAuth: true,
                    },
                    component: Product
                },
                {
                    path: '/order',
                    //path: '/order/:id',
                    name: 'order',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: Order
                },
                {
                    path: '/log',
                    //path: '/log/:id',
                    name: 'log',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: OperationLog
                },
                {
                    path: '/distributer',
                    //path: '/distributer/:id',
                    name: 'distributer',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: Distributer
                },
                {
                    path: '/distributionForm',
                    //path: '/distributionForm/:id',
                    name: 'distributionForm',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: DistributionForm
                },
                {
                    path: '/summary',
                    //path: '/distributionForm/:id',
                    name: 'summary',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: Summary
                },
                {
                    path: '/dashboard',
                    //path: '/dashboard/:id',
                    name: 'dashboard',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: Dashboard
                },
                {
                    path: '/adminUser',
                    //path: '/adminUser/:id',
                    name: 'adminUser',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: AdminUser
                },
                {
                    path: '/noPermission',
                    name: 'noPermission',
                    linkActiveClass: 'active',
                    meta: {
                        requireAuth: true,
                    },
                    component: NoPermission
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '*',
            component: NoPage
        }
    ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('ms_token')) {
    let user = {
        username: window.localStorage.getItem('ms_username'),
        token: window.localStorage.getItem('ms_token'),
		permissions: window.localStorage.getItem('ms_permissions'),
		operationCenter: window.localStorage.getItem('ms_operationCenter')
    }
    store.commit(types.LOGIN, user);
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.user.token) {
		  //alert(JSON.stringify(to));	
		  //alert(to.path);
		  var permission = false;
		  let resources = window.localStorage.ms_permissions;
		  //alert(resources);
		  
		  //如果是无权限页,直接进入
		  if(to.path == "/noPermission"){
			  next();
		  }
		  
          //校验权限
		  if(resources != null && resources != undefined && resources != 'undefined' && resources != ''){
			 let resourcesArray = resources.split(',');
             resourcesArray.forEach(function(p) {
              if (to.path == p) {
                  return permission = true;
                 }
             });
		  }
		  
		  if(permission){
			  next();
		  }else{
			  router.push('/noPermission');
		  }
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