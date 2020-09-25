export default {
    javaClass: "com.huawei.sdm.page.extend.mobile.container.MobilePage",
    fullScreen: true,
    includes: [],
    body: [
        {
            javaClass: "com.huawei.sdm.page.extend.mobile.container.MTabPanel",
            id: "pannel",
            tabPosition: "top",
            tabs: [
                {
                    javaClass: "com.huawei.sdm.page.extend.mobile.container.MTab",
                    id: "tab01",
                    title: "1",
                    icon: "ion-star",
                    iconAlign: "top",
                    content: [
                        {
                            javaClass: "com.huawei.sdm.page.extend.mobile.form.MFormPanel",
                            id: "form",
                            validations: [],
                            datafields: [
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.form.datafield.MTextInput",
                                    id: "fullname",
                                    name: "fullname",
                                    value: "happy",
                                    label: "fullname",
                                    canCopy: false,
                                    isOpenHistorys: false,
                                    type: "datafield",
                                },
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.form.datafield.MTextInput",
                                    id: "imaccount",
                                    name: "imaccount",
                                    value: "happy",
                                    label: "imaccount",
                                    canCopy: false,
                                    isOpenHistorys: false,
                                    type: "datafield",
                                },
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.form.datafield.MTextInput",
                                    id: "role",
                                    name: "role",
                                    value: "fme",
                                    readOnly: false,
                                    label: "role",
                                    canCopy: false,
                                    isOpenHistorys: false,
                                    type: "datafield",
                                },
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.form.datafield.MTextInput",
                                    id: "telephone",
                                    name: "telephone",
                                    value: "10000",
                                    label: "telephone",
                                    canCopy: false,
                                    isOpenHistorys: false,
                                    type: "datafield",
                                },
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.form.datafield.MTextInput",
                                    id: "state",
                                    name: "state",
                                    value: "1",
                                    label: "state",
                                    canCopy: false,
                                    isOpenHistorys: false,
                                    type: "datafield",
                                },
                            ],
                            buttons: [
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.button.MServiceButton",
                                    text: "Submit",
                                    accessControl: false,
                                    serviceId: "ms_contacts_info_create",
                                    confirmMessage: "fullname must be unique",
                                    ignoreItemPageHistory: false,
                                    canUseWhenOffline: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    javaClass: "com.huawei.sdm.page.extend.mobile.container.MTab",
                    id: "tab02",
                    title: "2",
                    icon: "ion-clock",
                    iconAlign: "left",
                    content: [
                        {
                            javaClass: "com.huawei.sdm.page.extend.mobile.grid.MDataGrid",
                            serviceId: "ms_contacts_info_getList",
                            parameters: '{"limit":"100","start":"0"}',
                            columns: [
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.grid.column.MColumn",
                                    dataIndex: "fullname",
                                    weight: "default",
                                },
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.grid.column.MColumn",
                                    dataIndex: "imaccount",
                                    weight: "default",
                                },
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.grid.column.MColumn",
                                    dataIndex: "role",
                                    weight: "default",
                                },
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.grid.column.MColumn",
                                    dataIndex: "telephone",
                                    weight: "default",
                                },
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.grid.column.MColumn",
                                    dataIndex: "state",
                                    weight: "default",
                                },
                            ],
                            direction: "vertical",
                            align: "center",
                            canUseWhenOffline: false,
                        },
                    ],
                    page: "ListView",
                },
                {
                    javaClass: "com.huawei.sdm.page.extend.mobile.container.MTab",
                    id: "tab03",
                    title: "3",
                    icon: "ion-home",
                    iconAlign: "bottom",
                    content: [
                        {
                            javaClass:
                                "com.huawei.sdm.page.extend.mobile.form.list.MListForm",
                            rowForms: [
                                {
                                    javaClass:
                                        "com.huawei.sdm.page.extend.mobile.form.list.MFormTemplate",
                                    datafields: [
                                        {
                                            javaClass:
                                                "com.huawei.sdm.page.extend.mobile.form.datafield.MTextInput",
                                            name: "textinput",
                                            value: "hello",
                                            canCopy: false,
                                            isOpenHistorys: false,
                                            type: "datafield",
                                        },
                                    ],
                                },
                            ],
                            name: "listform",
                            toolBar: {
                                javaClass:
                                    "com.huawei.sdm.page.extend.mobile.form.list.MListFormToolBar",
                                toolItems: [
                                    {
                                        javaClass:
                                            "com.huawei.sdm.page.extend.mobile.form.list.button.MListFormAddRowButton",
                                        text: "Add One",
                                    },
                                ],
                                position: "top",
                                align: "right",
                            },
                            maxCount: 20,
                            initCount: 1,
                            allowDeleteRow: true,
                        },
                    ],
                },
                {
                    javaClass: "com.huawei.sdm.page.extend.mobile.container.MTab",
                    id: "tab04",
                    title: "4",
                    icon: "ion-person-stalker",
                    iconAlign: "right",
                    page: "portal_slide_box",
                },
            ],
        },
    ],
};
