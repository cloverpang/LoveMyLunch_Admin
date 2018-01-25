import pagingComponent from './paging.vue'

const vMoPaging={
    install:function(Vue){
        Vue.component('vMoPaging',pagingComponent)
    }  //'vMoPaging'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default vMoPaging;