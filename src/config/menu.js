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
	active: false
  },
  {
    name: '用户',
    code: '/customer',
	path: '/customer',
	icon: 'icon-user',
	active: false
  },
  {
    name: '产品',
    code: '/product',
	path: '',
	icon: 'fa fa-th-large',
	active: false,
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
    code: '/total',
	path: '/total',
	icon: 'fa fa-table',
	active: false,
	items: [
      {
        name: '昨日汇总',
        code: '/total',
        path: '/total?type=yesterday',
		icon: 'fa fa-clock-o',
		active: false
      }
    ]
  },
  {
    name: '配送',
    code: '/distributionForm',
	path: '',
	icon: 'fa fa-bus',
	active: false,
    items: [
      {
        name: '配送单',
        code: '/distributionForm',
        path: '/distributionForm',
		icon: 'fa fa-file-text',
		active: false
      },
      {
        name: '配送员',
        code: '/distributer',
        path: '/distributer',
		icon: 'fa fa-user-md',
		active: false
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
	active: false
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
        code: '/admingUser',
        path: '/admingUser',
		icon: 'icon-user',
		active: false
      },
      {
        name: '系统设置',
        code: '/setting',
        path: '/setting',
		icon: 'fa fa-gear',
		active: false
      },
      {
        name: '系统日志',
        code: '/log',
        path: '/log',
		icon: 'fa fa-file-code-o',
		active: false
      }
    ]
  }
]
