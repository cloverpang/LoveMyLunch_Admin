import pageSortComponent from './pageSort.vue'

const vPageSort={
    install:function(Vue){
        Vue.component('vPageSort',pageSortComponent)
    }  //'vPageSort'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default vPageSort;