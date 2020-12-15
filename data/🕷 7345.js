export default {
  javaClass: "com.huawei.sdm.page.extend.mobile.container.MobilePage",
  fullScreen: true,
  includes: [
    {
      javaClass: "com.huawei.sdm.page.extend.mobile.include.MJavaScript",
      code:
        'Nf.PageReady(function(){\ndebugger;\n C("test").on("click", function(params){\n debugger;\n      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");\n })\n    \n    C("service").on("click", function(params){\n debugger;\n      C("listview").closeMultiSelectMode();\n })\n     C("test").on("click", function(params){\n debugger;\n      var re = C("listview").getSelectedItems();\n       console.log("getSelectedItems"+re[0].task_id);\n       Nf.promptConfirm({\n          message: re[0].task_id\n        });\n })\n    \n});',
    },
  ],
  body: [
    {
      javaClass: "com.huawei.sdm.page.extend.mobile.list.MListView",
      id: "listview",
      serviceId: "ms_demo_tasks_getList",
      serviceParameters: '{"owner":"aty","limit":"100","start":"0"}',
      location: "task_detail",
      itemIdentifyField: "id",
      linkParameters: '{"task_id":"#Row[task_id]"}',
      pageSize: 10,
      searchable: true,
      ignoreItemPageHistory: false,
      headerField: "task_id",
      summaryField: "title",
      asideField: "status",
      imageField: "#Row[icon].png",
      buttons: [
        {
          javaClass:
            "com.huawei.sdm.page.extend.mobile.list.button.MListRedirectButton",
          text: "another",
          cssClass: "button-balanced",
          location: "task_detail_another",
          parameters: '{"site_id":"#Row[site_id]","task_id":"#Row[task_id]"}',
          confirmMessage: "are you sure?",
        },
        {
          javaClass:
            "com.huawei.sdm.page.extend.mobile.list.button.MListServiceButton",
          text: "call",
          cssClass: "button-calm",
          serviceId: "ms_demo_tasks_update",
          parameters:
            '{"title":"#Row[title]-updated","task_id":"#Row[task_id]"}',
          confirmMessage: "are you sure?",
          successMessage: "success to call service.",
          canUseWhenOffline: true,
        },
        {
          javaClass:
            "com.huawei.sdm.page.extend.mobile.list.button.MListStickButton",
          id: "ooppo",
          text: "opopopop",
          cssClass: "button-positive",
          unStickText: "UnStick",
        },
      ],
      emptyMessage: "I will show when list is empty.",
      searchField: "title",
      searchPlaceholder: "input title",
      canUseWhenOffline: true,
      supportMultipleSelect: true,
      buttonsGroup: {
        javaClass:
          "com.huawei.sdm.page.extend.mobile.list.toolbar.MListButtonsGroup",
        buttonTextVisible: false,
        displayButtonsNum: 4,
        buttons: [
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.toolbar.MListToolRedirectButton",
            parameters:
              '{"site_id":"#Selection[site_id]","task_id":"#Selection[task_id]"}',
            text: "another",
            accessControl: false,
            location: "task_detail_another",
            ignoreItemPageHistory: false,
            confirmMessage: "are you sure?",
          },
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.toolbar.MListToolServiceButton",
            parameters:
              '{"site_id":"#Selection[site_id]","task_id":"#Selection[task_id]"}',
            text: "all",
            accessControl: false,
            confirmMessage: "Are you sure?",
            serviceId: "ms_demo_tasks_update",
            successMessage: "success to call service.",
            canUseWhenOffline: true,
            ignoreItemPageHistory: false,
          },
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.toolbar.MListToolRedirectButton",
            parameters:
              '{"site_id":"#Selection[site_id]","task_id":"#Selection[task_id]"}',
            text: "Receive",
            cssClass: "button-calm",
            accessControl: false,
            location: "task_detail_another",
            ignoreItemPageHistory: false,
          },
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.toolbar.MListToolButton",
            id: "service",
            text: "Common",
          },
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.toolbar.MListToolScriptButton",
            text: " Revert",
            iconClass: "ion-close",
            accessControl: false,
          },
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.toolbar.MListToolServiceButton",
            parameters: '{"task_id":"#Selection[task_id]"}',
            text: "Copy",
            accessControl: false,
            serviceId: "ms_demo_tasks_update",
            successMessage: "success to call service.",
            canUseWhenOffline: true,
            ignoreItemPageHistory: false,
          },
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.toolbar.MListToolRedirectButton",
            parameters: '{"task_id":"#Selection[task_id]"}',
            text: "Message",
            accessControl: false,
            location: "task_detail_another",
            ignoreItemPageHistory: false,
          },
          {
            javaClass:
              "com.huawei.sdm.page.extend.mobile.list.toolbar.MListToolButton",
            id: "test",
            text: "putong2",
          },
        ],
      },
    },
  ],
  header: {
    javaClass: "com.huawei.sdm.page.extend.mobile.container.MHeader",
    backButton: {
      javaClass: "com.huawei.sdm.page.extend.mobile.button.MBackButton",
      align: "left",
    },
    buttons: [],
  },
};
