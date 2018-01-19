export default [
  {
    name: '系统首页',
    code: '/default',
	path: '/default',
	icon: 'icon-home',
	active: false
  },
  {
    name: '客户公司',
    code: '/company',
	path: '/company',
	icon: 'icon-users',
	active: false,
	permission: 'company_get_list,company_get_one',
	components:[
	  {
		  name : '添加新公司',
		  code : 'component_company_add',
		  permission : 'company_add'
	  },
	  {
		  name : '批量删除',
		  code : 'component_company_batch_delete',
		  permission : 'company_batch_delete'
	  },
	  {
		  name : '删除',
		  code : 'component_company_delete',
		  permission : 'company_delete'
	  },
	  {
		  name : '编辑',
		  code : 'component_company_update',
		  permission : 'company_update'
	  }
	]
  },
  {
    name: '用户',
    code: '/customer',
	path: '/customer',
	icon: 'icon-user',
	active: false,
	permission: 'customer_get_list,customer_get_one,customer_add',
	components:[
	  {
		  name : '删除',
		  code : 'component_customer_delete',
		  permission : 'customer_delete'
	  },
	  {
		  name : '编辑',
		  code : 'component_customer_update',
		  permission : 'customer_update'
	  }
	]
  },
  {
    name: '产品',
    code: '/product',
	path: '',
	icon: 'fa fa-th-large',
	active: false,
	permission: 'dish_get_list,dish_get_one,dish_marknotuse',
	components:[
	  {
		  name : '删除',
		  code : 'component_dish_delete',
		  permission : 'dish_delete'
	  },
	  {
		  name : '编辑',
		  code : 'component_dish_update',
		  permission : 'dish_update'
	  },
	  {
		  name : '新增',
		  code : 'component_dish_add',
		  permission : 'dish_add'
	  }
	],
    items: [
      {
        name: '菜品',
        code: '/product/dish',
        path: '/product/dish',
		icon: 'icon-heart',
		active: false
      },
      {
        name: '汤品',
        code: '/product/soup',
        path: '/product/soup',
		icon: 'icon-heart',
		active: false
      },
      {
        name: '主食',
        code: '/product/staplefood',
        path: '/product/staplefood',
		icon: 'icon-heart',
		active: false
      }
    ]
  },
  {
    name: '订单',
    code: '/order',
	path: '/order',
	icon: 'fa fa-shopping-cart',
	active: false,
	permission: 'order_get_list,order_get_one,order_cancel,order_add',
	components:[
	  {
		  name : '删除',
		  code : 'component_order_delete',
		  permission : 'order_delete'
	  },
	  {
		  name : '编辑',
		  code : 'component_order_update',
		  permission : 'order_update'
	  }
	],
	items: [
      {
        name: '当天订单',
        code: '/order',
        path: '/order?type=today',
		icon: 'fa fa-clock-o',
		active: false
      }
    ]
  },
    {
    name: '汇总',
    code: '/summary',
	path: '/summary',
	icon: 'fa fa-table',
	active: false,
	permission: 'summary',
	items: [
      {
        name: '当日汇总',
        code: '/summary',
        path: '/summary?type=today',
		icon: 'fa fa-clock-o',
		active: false
      }
    ]
  },
  {
    name: '配送',
    code: '/distribution',
	path: '',
	icon: 'fa fa-bus',
	active: false,
    items: [
      {
        name: '配送单',
        code: '/distributionForm',
        path: '/distributionForm',
		icon: 'fa fa-file-text',
		active: false,
	    permission: 'distributionForm_get_list,distributionForm_get_one,distributionForm_update,distributionForm_add',
	    components:[
	      {
		    name : '删除',
		    code : 'component_distributionForm_delete',
		    permission : 'distributionForm_delete'
	      },
	      {
		    name : '生成配送单',
		    code : 'component_distributionForm_generate',
		    permission : 'distributionForm_generate'
	      },
	      {
		    name : '标记所有已到达',
		    code : 'component_distributionForm_mark_all_arrived',
		    permission : 'distributionForm_mark_all_arrived'
	      },
	      {
		    name : '标记到达',
		    code : 'component_distributionForm_mark_arrived',
		    permission : 'distributionForm_mark_arrived'
	      },
	      {
		    name : '分配配送员',
		    code : 'component_distributionForm_select_dirstributer',
		    permission : 'distributionForm_select_dirstributer'
	      }
	    ]
      },
      {
        name: '配送员',
        code: '/distributer',
        path: '/distributer',
		icon: 'fa fa-user-md',
		active: false,
	    permission: 'distributer_get_list,distributer_get_one',
	    components:[
	      {
		    name : '删除',
		    code : 'component_distributer_delete',
		    permission : 'distributer_delete'
	      },
	      {
		    name : '编辑',
		    code : 'component_distributer_update',
		    permission : 'distributer_update'
	      },
	      {
		    name : '新增',
		    code : 'component_distributer_add',
		    permission : 'distributer_add'
	      }
	    ]
      }
    ]
  },
  //{
    //name: '支付',
    //code: '/payment',
	//path: '/payment',
	//icon: 'fa fa-dollar',
	//active: false
  //},
  {
    name: '统计',
    code: '/dashboard',
	path: '/dashboard',
	icon: 'icon-bar-chart',
	active: false,
	permission: 'dashboard_summary,dashboard_order_chart,dashboard_customer_chart'
  },
  {
    name: '系统',
    code: '/setting',
	path: '',
	icon: 'fa fa-cog',
	active: false,
    items: [
      {
        name: '系统管理员',
        code: '/adminUser',
        path: '/adminUser',
		icon: 'icon-user',
		active: false,
		permission: 'adminUser_getAll',
	    components:[
	      {
		    name : '删除',
		    code : 'component_adminUser_delete',
		    permission : 'adminUser_delete'
	      },
	      {
		    name : '修改密码',
		    code : 'component_adminUser_updatePassword',
		    permission : 'adminUser_updatePassword'
	      },
	      {
		    name : '修改前端权限',
		    code : 'component_adminUser_update_front_permission',
		    permission : 'adminUser_update_front_permission'
	      },
	      {
		    name : '修改后端权限',
		    code : 'component_adminUser_update_backend_permission',
		    permission : 'adminUser_update_backend_permission'
	      }
	    ]
      },
      //{
        //name: '系统设置',
        //code: '/setting',
        //path: '/setting',
		//icon: 'fa fa-gear',
		//active: false
      //},
      {
        name: '系统日志',
        code: '/log',
        path: '/log',
		icon: 'fa fa-file-code-o',
		active: false,
		permission: 'operationLog_get_list,operationLog_delete,operationLog_batch_delete,operationLog_get_one',
      }
    ]
  }
]
