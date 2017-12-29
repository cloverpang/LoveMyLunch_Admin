export default [
  {
    name: '系统首页',
	path: '/default',
	icon: 'icon-home',
	active: false
  },
  {
    name: '客户公司',
	path: '/company',
	icon: 'icon-users',
	active: false
  },
  {
    name: '用户',
	path: '/customer',
	icon: 'icon-user',
	active: false
  },
  {
    name: '产品',
	path: '',
	icon: 'fa fa-th-large',
	active: false,
    items: [
      {
        name: '菜品',
        path: '/dish',
		icon: 'icon-heart',
		active: false
      },
      {
        name: '汤品',
        path: '/soup',
		icon: 'icon-heart',
		active: false
      },
      {
        name: '主食',
        path: '/staplefood',
		icon: 'icon-heart',
		active: false
      }
    ]
  },
  {
    name: '订单',
	path: '/order',
	icon: 'fa fa-shopping-cart',
	active: false
  },
  {
    name: '配送',
	path: '',
	icon: 'fa fa-bus',
	active: false,
    items: [
      {
        name: '配送单',
        path: '/distributionForm',
		icon: 'fa fa-file-text',
		active: false
      },
      {
        name: '配送员',
        path: '/distributer',
		icon: 'fa fa-user-md',
		active: false
      }
    ]
  },
  {
    name: '支付',
	path: '/payment',
	icon: 'fa fa-dollar',
	active: false
  },
  {
    name: '统计',
	path: '/dashboard',
	icon: 'icon-bar-chart',
	active: false
  },
  {
    name: '系统',
	path: '',
	icon: 'fa fa-cog',
	active: false,
    items: [
      {
        name: '系统设置',
        path: '/setting',
		icon: 'fa fa-gear',
		active: false
      },
      {
        name: '系统日志',
        path: '/log',
		icon: 'fa fa-file-code-o',
		active: false
      }
    ]
  }
]
