<template>
        <!-- BEGIN HEADER -->
        <div class="page-header">
		 <v-headertop></v-headertop>
         <v-headermenu></v-headermenu>
        </div>
        <!-- END HEADER -->
</template>

<script>
	import vHeadermenu from './HeaderMenu.vue';
    import vHeadertop from './HeaderTop.vue';
    export default {
        components:{
            vHeadermenu,vHeadertop
        }
    }
</script>


