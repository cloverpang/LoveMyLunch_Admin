<template>
                                            <div :id="modalId" class="modal fade" tabindex="-1" role="dialog" v-bind:aria-labelledby="modalId" aria-hidden="true" style="padding-top:200px;">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
													    <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                            <h4 class="modal-title">Confirm </h4>
                                                        </div>
                                                        <div class="modal-body">
                                                            <p> {{confirmMessage}} {{itemName}}? </p>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>
                                                            <button class="btn blue" @click="handleConfirm(itemId)">确认</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
</template>



<script>
export default {
    name : 'confirmModal',
    //通过props来接受从父组件传递过来的值
    props : {
        //页面中的可见数据
		modalId : { 
            default : 'confirmModal'
        },
		
        itemId : { 
            default : ''
        },

        itemName : {
            default : ''
        },
		
	    confirmMessage : {
            default : 'Confirm?'
        }
    },
    methods : {
        handleConfirm (itemId) {
                //父组件通过handleConfirm方法来处理该请求
                this.$emit('handleConfirm', this.itemId)
        }
    },
    computed : {
    },
    data () {
        return {
		    modalId : this.modalId,//当前div id
            itemName : this.itemName, //当前页码
            itemId : this.itemId, //每页显示条数
			confirmMessage : this.confirmMessage //显示的确认信息
        }
    },
    watch : {
    }
}
</script>

<style scoped>

</style>
