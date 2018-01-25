<template>
    <div class="pagination">
        <!-- first -->
        <template v-if="index != 1">
        <a
        :class="[{'prev' : index != 1},{'paging-item--disabled' : index == 1}]" :disabled="index == 1"
        @click="first">第一页</a>
        </template>
        <template v-if="index == 1">
        <span>第一页</span>
        </template>
	
        <!-- prev -->
        <template v-if="index != 1">
        <a
        :class="[{'prev' : index != 1},{'paging-item--disabled' : index == 1}]" :disabled="index == 1"
        @click="prev">前一页</a>
        </template>
        <template v-if="index == 1">
        <span>前一页</span>
        </template>

        <a
        :class="['prev']"
        v-if="showPrevMore">...</a>

        <a
        :class="[{'prev' : index != pager},{'current' : index == pager}]"
        v-for="pager in pagers"
        @click="go(pager)">{{ pager }}</a>

        <a
        :class="['next']"
        v-if="showNextMore">...</a>

        <!-- next -->
        <template v-if="index != pages">
        <a
        :class="[{'next' : index != pages},{'paging-item--disabled' : index == pages}]" :disabled="index == pages"
        @click="next">下一页</a>
        </template>
        <template v-if="index == pages">
        <span>下一页</span>
        </template>
		
        <!-- last -->
        <template v-if="index != pages">
        <a
        :class="[{'next' : index != pages},{'paging-item--disabled' : index == pages}]" :disabled="index == pages"
        @click="last">末页</a>
        </template>
        <template v-if="index == pages">
        <span>末页</span>
        </template>

                                                       
        <input type="text" style="width:80px;height:32px;" v-model="goPage"></input>
        <button class="btn green" type="button" style="width:50px;height:32px;margin-bottom:4px;margin-left:-5px;" @click="goingToPage">Go</button>
                                                        
    </div>
</template>



<script>
export default {
    name : 'vMoPaging',
    //通过props来接受从父组件传递过来的值
    props : {

        //页面中的可见页码，其他的以...替代, 必须是奇数
        perPages : { 
            type : Number,
            default : 5 
        },

        //当前页码
        pageIndex : {
            type : Number,
            default : 1
        },

        //每页显示条数
        pageSize : {
            type : Number,
            default : 10
        },

        //总记录数
        total : {
            type : Number,
            default : 1
        },

    },
    methods : {
        prev(){
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        next(){
            if (this.index < this.pages) {
                this.go(this.index + 1)
            }
        },
        first(){
            if (this.index !== 1) {
                this.go(1)
            }
        },
        last(){
            if (this.index != this.pages) {
                this.go(this.pages)
            }
        },
        goingToPage(){
           if (this.index != this.goPage){
               this.go(this.goPage);
           }
        },
        go (page) {
            if (this.index !== page) {
                this.index = page;
                this.goPage = page;
                //父组件通过change方法来接受当前的页码
                this.$emit('change', this.index)
            }
        }
    },
    computed : {

        //计算总页码
        pages(){
            return Math.ceil(this.size / this.limit)
        },

        //计算页码，当count等变化时自动计算
        pagers () {
            const array = []
            const perPages = this.perPages
            const pageCount = this.pages
            let current = this.index
            const _offset = (perPages - 1) / 2

            const offset = {
                start : parseInt(current) - parseInt(_offset),
                end   : parseInt(current) + parseInt(_offset)
            }

            //-1, 3
            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }

            if (offset.start < 1) offset.start = 1

            this.showPrevMore = (offset.start > 1)
            this.showNextMore = (offset.end < pageCount)

            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)
            }

            return array
        }
    },
    data () {
        return {
            index : this.pageIndex, //当前页码
            limit : this.pageSize, //每页显示条数
            size : this.total || 1, //总记录数
            showPrevMore : false,
            showNextMore : false,
            goPage : this.pageIndex //显示在Go Input中的当前页码
        }
    },
    watch : {
        pageIndex(val) {
            this.index = val || 1
        },
        pageSize(val) {
            this.limit = val || 10
        },
        total(val) {
            this.size = val || 1
        }
    }
}
</script>

<style scoped>
.pagination {
            font-size: 11px;
            font-weight:bold;
        }
        
.pagination a {
    text-decoration: none;
	border: #fff;
}

.pagination span {
    display: block;
    float: left;
    padding: 0.6em 0.8em;
    margin-right: 5px;
	margin-bottom: 5px;
	min-width:1em;
	text-align:center;
    border:1px solid #999999;
    color: #999999;
}

.pagination .current {
    display: block;
    float: left;
    padding: 0.6em 0.8em;
    margin-right: 5px;
	margin-bottom: 5px;
	min-width:1em;
	text-align:center;
    border:1px solid #E7505A;
    background: #E7505A;
    color: #fff;
}

.pagination .prev, .pagination .next{
    display: block;
    float: left;
    padding: 0.6em 0.8em;
    margin-right: 5px;
	margin-bottom: 5px;
	min-width:1em;
	text-align:center;
    border:1px solid #E7505A;
    color: #E7505A;
}

.paging-item--disabled{
    display: block;
    float: left;
    color: #333333;
    padding: 0.6em 0.8em;
    margin-right: 5px;
	margin-bottom: 5px;
	min-width:1em;
	text-align:center;
    border:1px solid #ffffff;
}
</style>
