export default {
    javaClass: "com.huawei.sdm.page.extend.mobile.container.MobilePage",
    fullScreen: true,
    includes: [
        {
            javaClass: "com.huawei.sdm.page.extend.mobile.include.event.MEventBus",
            events: [
                {
                    javaClass: "com.huawei.sdm.page.extend.mobile.include.event.MEvent",
                    id: "event001",
                    name: "event001",
                    enable: true,
                    triggers: [
                        {
                            javaClass:
                                "com.huawei.sdm.page.extend.mobile.include.event.trigger.MDataFieldValueChangeTrigger",
                            id: "changetrigger001",
                            condition: '"select001" is not empty',
                            dataField: "select001",
                        },
                    ],
                    listeners: [
                        {
                            javaClass:
                                "com.huawei.sdm.page.extend.mobile.include.event.listener.MSelectFilterListener",
                            id: "testselect001",
                            priority: 10,
                            dataField: "select002",
                            variableName: "app_id",
                            value: "#Form[form.select001]",
                        },
                    ],
                },
                {
                    javaClass: "com.huawei.sdm.page.extend.mobile.include.event.MEvent",
                    name: "event002",
                    enable: true,
                    triggers: [
                        {
                            javaClass:
                                "com.huawei.sdm.page.extend.mobile.include.event.trigger.MLoadDataFinishedTrigger",
                            loadDataId: "dataLoader001",
                        },
                        {
                            javaClass:
                                "com.huawei.sdm.page.extend.mobile.include.event.trigger.MDataFieldValueChangeTrigger",
                            condition: '"select001" is not empty',
                            dataField: "select002",
                        },
                    ],
                    listeners: [
                        {
                            javaClass:
                                "com.huawei.sdm.page.extend.mobile.include.event.listener.MLoadDataListener",
                            id: "loadDataAction001",
                            priority: 10,
                            parameters: '{"limit":"100","start":"0"}',
                            serviceId: "ms_eventbus_select002_getList",
                        },
                        {
                            javaClass:
                                "com.huawei.sdm.page.extend.mobile.include.event.listener.MSetValueListener",
                            priority: 10,
                            dataField: "text001",
                            value: "#Form[form.select002]",
                        },
                    ],
                },
            ],
        },
    ],
    body: [
        {
            javaClass: "com.huawei.sdm.page.extend.mobile.form.MFormPanel",
            id: "form",
            formDataLoader: {
                javaClass: "com.huawei.sdm.page.extend.mobile.form.MFormDataLoader",
                id: "dataLoader001",
                serviceId: "ms_eventbus_select001_getList",
                parameters: '{"limit":"100","start":"0"}',
                cache: true,
            },
            validations: [],
            datafields: [
                {
                    javaClass:
                        "com.huawei.sdm.page.extend.mobile.form.datafield.MSimpleSelect",
                    id: "select001",
                    name: "select001",
                    readOnly: false,
                    label: "APP",
                    parameters: '{"limit":"100","start":"0"}',
                    serviceId: "ms_eventbus_select001_getList",
                    output: '{"value":"app_id","text":"appname"}',
                    placeHolder: "please select",
                    options: [],
                    type: "datafield",
                },
                {
                    javaClass:
                        "com.huawei.sdm.page.extend.mobile.form.datafield.MSimpleSelect",
                    id: "select002",
                    name: "select002",
                    label: "Page",
                    parameters: '{"limit":"100","start":"0"}',
                    serviceId: "ms_eventbus_select002_getList",
                    output: '{"value":"id","text":"pagename"}',
                    options: [],
                    type: "datafield",
                },
                {
                    javaClass:
                        "com.huawei.sdm.page.extend.mobile.form.datafield.MTextInput",
                    id: "text001",
                    name: "text001",
                    canCopy: false,
                    isOpenHistorys: false,
                    type: "datafield",
                },
            ],
            buttons: [],
        },
    ],
    header: {
        javaClass: "com.huawei.sdm.page.extend.mobile.container.MHeader",
        backButton: {
            javaClass: "com.huawei.sdm.page.extend.mobile.button.MBackButton",
            iconClass: "ion-close",
        },
        buttons: [],
    },
};
