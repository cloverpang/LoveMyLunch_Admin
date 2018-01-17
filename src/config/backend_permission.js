export default [
  {
    name: 'adminUser',
    items: [
      {
        code: 'adminUser_updatePassword'
      },
      {
		code: 'adminUser_delete'
      },
      {
		code: 'adminUser_getAll'
      },
      {
		code: 'adminUser_update_front_permission'
      },
      {
		code: 'adminUser_update_backend_permission'
      }
    ]
  },
  {
    name: 'company',
    items: [
      {
        code: 'company_get_list'
      },
      {
		code: 'company_delete'
      },
      {
		code: 'company_batch_delete'
      },
      {
		code: 'company_update'
      },
      {
		code: 'company_add'
      },
      {
		code: 'company_get_one'
      }
    ]
  },
  {
    name: 'customer',
    items: [
      {
        code: 'customer_get_list'
      },
      {
		code: 'customer_delete'
      },
      {
		code: 'customer_update'
      },
      {
		code: 'customer_add'
      },
      {
		code: 'customer_get_one'
      }
    ]
  },
  {
    name: 'order',
    items: [
      {
        code: 'order_get_list'
      },
      {
		code: 'order_delete'
      },
      {
		code: 'order_cancel'
      },
      {
		code: 'order_update'
      },
      {
		code: 'order_add'
      },
      {
		code: 'order_get_one'
      }
    ]
  },
  {
    name: 'dish',
    items: [
      {
        code: 'dish_get_list'
      },
      {
		code: 'dish_delete'
      },
      {
		code: 'dish_marknotuse'
      },
      {
		code: 'dish_update'
      },
      {
		code: 'dish_add'
      },
      {
		code: 'dish_get_one'
      }
    ]
  },
  {
    name: 'distributer',
    items: [
      {
        code: 'distributer_get_list'
      },
      {
		code: 'distributer_delete'
      },
      {
		code: 'distributer_update'
      },
      {
		code: 'distributer_add'
      },
      {
		code: 'distributer_get_one'
      }
    ]
  },
  {
    name: 'distributionForm',
    items: [
      {
        code: 'distributionForm_get_list'
      },
      {
		code: 'distributionForm_delete'
      },
      {
		code: 'distributionForm_update'
      },
      {
		code: 'distributionForm_add'
      },
      {
		code: 'distributionForm_get_one'
      },
	  {
		code: 'distributionForm_generate'
      },
	  {
		code: 'distributionForm_mark_all_arrived'
      },
	  {
		code: 'distributionForm_mark_arrived'
      },
	  {
		code: 'distributionForm_select_dirstributer'
      }
    ]
  },
  {
    name: 'operationLog',
    items: [
      {
        code: 'operationLog_get_list'
      },
      {
		code: 'operationLog_delete'
      },
      {
		code: 'operationLog_batch_delete'
      },
      {
		code: 'operationLog_get_one'
      }
    ]
  },
  {
    name: 'dashboard',
    items: [
      {
        code: 'dashboard_summary'
      },
      {
		code: 'dashboard_order_chart'
      },
      {
		code: 'dashboard_customer_chart'
      }
    ]
  },
  {
    name: 'summary',
    items: [
      {
        code: 'summary'
      }
    ]
  }
]
