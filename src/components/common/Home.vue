<template>
    <div>
        <v-header></v-header>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
		<v-prefooter></v-prefooter>
		<v-footer></v-footer>
		<v-totop></v-totop>
    </div>
</template>

<script>
    import vHeader from './Header.vue';
	import vPrefooter from './Prefooter.vue';
	import vFooter from './Footer.vue';
	import vTotop from './Totop.vue';
    export default {
        components:{
            vHeader,vPrefooter,vFooter,vTotop
        }
    }
</script>
