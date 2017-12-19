export default [
  {
    name: '系统首页',
	path: '/default',
	icon: 'icon-home',
	active: true
  },
  {
    name: '私募基金公司',
	path: '/company',
	icon: 'icon-globe',
	active: false,
    items: [
      {
        name: '页面1',
        path: '/company',
		icon: 'icon-bar-chart',
		active: false
      }, {
        name: '页面2',
        path: '/company',
		icon: 'icon-bulb',
		active: false
      }
    ]
  },
  {
    name: '私募基金',
	path: '/fund',
	icon: 'icon-diamond',
	active: false,
    items: [
      {
        name: '页面3',
        path: '/company',
		icon: 'icon-bar-chart',
		active: false
      }, {
        name: '页面4',
        path: '/company',
		icon: 'icon-bulb',
		active: false
      }
    ]
  }
]
