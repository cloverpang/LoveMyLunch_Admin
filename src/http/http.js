/**
 * Created by yaojunjun on 12/04/2017.
 */
import axios from 'axios'
import store from '../vuex/store'
import * as types from '../vuex/types'
import router from '../router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:8080/lovermylunch_api';
//axios.defaults.baseURL = '/lovermylunch_api/';
axios.defaults.headers['ai-api-access-token'] = 'fb34e7cbca8bcac576a4ce31c9dc28ba';
axios.defaults.headers['AI-Token'] = 'yyyy';
axios.defaults.headers['Authorization'] = 'zzzz';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.user.token) {
            config.headers.Authorization = `${store.state.user.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
                case 403:
                    // 403 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;