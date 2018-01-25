<template>
														<div style="display:inline;position:relative;top:-5px;">
                                                           <a href="javascript:void(0);" @click="handleSort(sortColumn,'desc')">
														   <i class="fa fa-angle-up"></i>
														   </a>
														    <a href="javascript:void(0);" @click="handleSort(sortColumn,'asc')">
														   <i class="fa fa-angle-down" style="position:absolute;z-index:999;margin-top:12px;margin-left:-9px;"></i>
														   </a>
														</div>
</template>



<script>
export default {
    name : 'vPageSort',
    //通过props来接受从父组件传递过来的值
    props : {
        //排序列
        sortColumn : { 
            default : ''
        }
    },
    methods : {
        handleSort(sortColumn,sortType){
                //父组件通过handleSort方法来处理该请求
                this.$emit('handleSort',sortColumn,sortType)
        }
    },
    computed : {

    },
    data () {
        return {
                sortColumn : this.sortColumn //当前页码
        }
    },
    watch : {

    }
}
</script>

<style scoped>

</style>
