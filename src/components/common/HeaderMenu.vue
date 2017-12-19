<template>
            <!-- BEGIN HEADER MENU -->
            <div class="page-header-menu">
                <div class="container">
                    <!-- BEGIN MEGA MENU -->
                    <!-- DOC: Apply "hor-menu-light" class after the "hor-menu" class below to have a horizontal menu with white background -->
                    <!-- DOC: Remove data-hover="dropdown" and data-close-others="true" attributes below to disable the dropdown opening on mouse hover -->
                    <div class="hor-menu">
                        <ul class="nav navbar-nav">
            <template>
              <li class="menu-dropdown mega-menu-dropdown"  v-for="(menu,index) in menus" @click="selectStyle(menu, index)" :class="{'active':menu.active}">
                <router-link :to="menu.path">
                  <i :class="menu.icon"></i>
                  {{ menu.name }}
				 <span class="arrow"></span>
                </router-link>
			    <ul class="dropdown-menu pull-left">
                 <li v-for="item in menu.items" @click="selectSubStyle(menu, item, index)" :class="{'active':item.active}">
                   <router-link :to="item.path">
                     <i :class="item.icon"></i>
                     {{ item.name }}
                    </router-link>
                  </li>
			    </ul>
              </li>
            </template>
                        </ul>
                    </div>
                    <!-- END MEGA MENU -->
                </div>
            </div>
            <!-- END HEADER MENU -->
</template>

<script>
  import menuConfig from '../../config/menu'

  export default {
    data () {
      return {
        menus: menuConfig
      }
    },
    methods:{
	  handleMenuChange(){
	  },
	  selectStyle(menu, index) {
			this.menus.forEach(function(item) {
                item.active = false;
            });
			menu.active = true;
　　　},
      selectSubStyle(menu, item, index) {
			menu.items.forEach(function(subItem) {
                 subItem.active = false;
            });
			item.active = true;
　　　}
	}
  }
</script>


<style scoped>

</style>
