import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store'
import axios from './http/http';

/*Vue.prototype.$http = axios.create({
    baseURL: 'http://www.czoll.com:8080/api/',
    timeout: 1000,
    headers: {'ai-api-access-token': 'fb34e7cbca8bcac576a4ce31c9dc28ba','AI-Token':'yyyy','Authorization':'zzzz'}
});*/
Vue.prototype.$http = axios;
//const vm = new Vue({
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

//window.vm = vm;