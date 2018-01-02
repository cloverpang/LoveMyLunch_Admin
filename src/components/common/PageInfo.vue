<template>
                                            <div class="caption" v-if="count">
                                                <i class="fa fa-cogs"></i> 数据列表 
												<span style="font-size:12px;">
												 共 {{count}} 条 
                                                 第 {{currentPage}} 页
                                                 共 {{totalPages}} 页
												</span>
												<span style="font-size:12px;">
                                                每页显示 : 
												<select v-model="selected" style="color:#000000;display:inline;" @change="handleChange(selected)">
                                                                                       <option v-for="option in options" v-model="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                </select> 
                                                条
												</span>      
											</div>

                                            <div class="caption" v-else="count==0">
                                                <i class="fa fa-cogs"></i> 没有数据    
											</div>

</template>



<script>
export default {
    name : 'vPageInfo',
    //通过props来接受从父组件传递过来的值
    props : {
        //当前页码
        currentPage : { 
            type : Number,
            default : 1 
        },

        //总页数
        totalPages : {
            type : Number,
            default : 0
        },

        //总记录数
        count : {
            type : Number,
            default : 0
        },

        //每页记录数
        selected : {
            type : Number,
            default : 15
        },

        //选项集合
        options : {
            default : [
				   { text: ' 15 ', value: '15' },
                   { text: ' 30 ', value: '30' },
				   { text: ' 50 ', value: '50' }
                ]
        },

    },
    methods : {
        handleChange(item_selected){
                //父组件通过handleChange方法来处理该请求
                this.$emit('handleChange',item_selected)
        }
    },
    computed : {

    },
    data () {
        return {
                item_currentPage : this.currentPage, //当前页码
				item_totalPages : this.totalPages,//总页数
                item_count : this.count, //总记录数
                item_options: this.options,//选项
				item_selected: this.selected //默认选择数
        }
    },
    watch : {

    }
}
</script>

<style scoped>

</style>
