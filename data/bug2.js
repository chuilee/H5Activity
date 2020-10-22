export default {
  javaClass: "com.huawei.sdm.page.extend.mobile.container.MobilePage",
  fullScreen: false,
  includes: [],
  body: [
    {
      javaClass: "com.huawei.sdm.page.extend.mobile.container.MCard",
      title: "测试结果",
      collapse: true,
      content: [
        {
          javaClass:
            "com.huawei.sdm.page.extend.mobile.chart.MVisualScriptWidget",
          script: "mobile_samples.mobile_test_result",
          width: "450",
          height: "200",
        },
      ],
    },
    {
      javaClass: "com.huawei.sdm.page.extend.mobile.list.MListView",
      id: "page_name",
      serviceId: "ms_main_page_getList",
      itemIdentifyField: "id",
      itemUrlField: "page_name",
      pageSize: 10,
      searchable: true,
      ignoreItemPageHistory: false,
      buttons: [
        {
          javaClass:
            "com.huawei.sdm.page.extend.mobile.list.button.MListServiceButton",
          text: "通过",
          serviceId: "ms_main_page_update",
          parameters: '{"page_name":"#Row[page_name]","test_state":"通过"}',
          successMessage: "更新成功",
          canUseWhenOffline: true,
        },
        {
          javaClass:
            "com.huawei.sdm.page.extend.mobile.list.button.MListServiceButton",
          text: "不通过",
          serviceId: "ms_main_page_update",
          parameters: '{"page_name":"#Row[page_name]","test_state":"不通过"}',
          successMessage: "更新成功",
          canUseWhenOffline: true,
        },
        {
          javaClass:
            "com.huawei.sdm.page.extend.mobile.list.button.MListServiceButton",
          text: "待测试",
          serviceId: "ms_main_page_update",
          parameters: '{"test_state":"待测试","page_name":"#Row[page_name]"}',
          successMessage: "更新成功",
          canUseWhenOffline: true,
        },
      ],
      customRowTemplate:
        '<div style="margin-bottom:10px;">\n<span style="color:#b2b2b2">页面名:</span> {{row.page_name}}\n</div>\n<div style="color:red;height:12px;white-space:normal;line-height:10px;margin-bottom:10px;">\n<span style="color:#b2b2b2">测试状态:</span> {{row.test_state}}\n</div>\n<div style="color:green;height:30px;white-space:normal;line-height:20px;margin-bottom:10px;">\n{{row.description}}\n</div>\n',
      searchField: "page_name",
      searchPlaceholder: "页面名",
      canUseWhenOffline: true,
      filter: {
        javaClass: "com.huawei.sdm.page.extend.mobile.list.MListFilter",
        filterItems: [
          {
            javaClass: "com.huawei.sdm.page.extend.mobile.list.MListFilterItem",
            label: "测试结果",
            modelKey: "test_state",
            type: "select",
            options: '{"待测试":"待测试","不通过":"不通过","通过":"通过"}',
            output: '{"text":"","value":""}',
            operator: "<=",
          },
        ],
        orderItems: [
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.order.SingleOrderItem",
            field: "test_state",
            header: "测试状态",
          },
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.order.SingleOrderItem",
            field: "change_time",
            header: "更新时间",
          },
        ],
        filterTitle: "过滤器标题",
        asc: "asc",
      },
      supportMultipleSelect: false,
    },
  ],
};