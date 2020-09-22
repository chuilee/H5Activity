export default {
    javaClass: "com.huawei.sdm.page.extend.mobile.container.MobilePage",
    fullScreen: true,
    includes: [],
    body: [
        {
            javaClass: "com.huawei.sdm.page.extend.mobile.form.MFormPanel",
            validations: [],
            datafields: [],
            buttons: [
                {
                    javaClass: "com.huawei.sdm.page.extend.mobile.button.MRedirectButton",
                    text: "laid in FormPanel",
                    style: "button-block",
                    cssClass: "button-energized",
                    accessControl: false,
                    ignoreItemPageHistory: false,
                },
            ],
        },
    ],
    header: {
        javaClass: "com.huawei.sdm.page.extend.mobile.container.MHeader",
        fontSize: "20px",
        text: "CM-20160606-00032",
        backButton: {
            javaClass: "com.huawei.sdm.page.extend.mobile.button.MBackButton",
            align: "left",
        },
        buttons: [
            {
                javaClass: "com.huawei.sdm.page.extend.mobile.button.MScriptButton",
                style: "button-icon",
                iconClass: "ion-ios-camera-outline",
                accessControl: false,
            },
        ],
        buttonsGroup: {
            javaClass:
                "com.huawei.sdm.page.extend.mobile.container.MMoreButtonsGroup",
            iconClass: "ion-android-more-vertical",
            buttons: [
                {
                    javaClass: "com.huawei.sdm.page.extend.mobile.button.MScriptButton",
                    text: "header1",
                    cssClass: "button-balanced",
                    accessControl: false,
                },
                {
                    javaClass: "com.huawei.sdm.page.extend.mobile.button.MScriptButton",
                    text: "header2",
                    cssClass: "button-energized",
                    iconClass: "ion-close",
                    accessControl: false,
                },
            ],
        },
    },
    footer: {
        javaClass: "com.huawei.sdm.page.extend.mobile.container.MFooter",
        buttons: [
            {
                javaClass: "com.huawei.sdm.page.extend.mobile.button.MRedirectButton",
                text: "fixed",
                cssClass: "button-balanced",
                accessControl: false,
                ignoreItemPageHistory: false,
            },
        ],
        buttonsGroups: [
            {
                javaClass:
                    "com.huawei.sdm.page.extend.mobile.container.MMoreButtonsGroup",
                text: "group1",
                buttons: [
                    {
                        javaClass: "com.huawei.sdm.page.extend.mobile.button.MScriptButton",
                        text: "t1",
                        cssClass: "button-calm",
                        accessControl: false,
                    },
                    {
                        javaClass: "com.huawei.sdm.page.extend.mobile.button.MScriptButton",
                        text: "t2",
                        cssClass: "button-balanced",
                        accessControl: false,
                    },
                    {
                        javaClass: "com.huawei.sdm.page.extend.mobile.button.MScriptButton",
                        text: "t3",
                        cssClass: "button-energized",
                        accessControl: false,
                    },
                ],
            },
            {
                javaClass:
                    "com.huawei.sdm.page.extend.mobile.container.MMoreButtonsGroup",
                text: "group2",
                iconClass: "ion-plus",
                buttons: [
                    {
                        javaClass:
                            "com.huawei.sdm.page.extend.mobile.button.MRedirectButton",
                        text: "t4",
                        style: "button-icon",
                        cssClass: "button-balanced",
                        iconClass: "ion-heart",
                        accessControl: false,
                        ignoreItemPageHistory: false,
                    },
                ],
            },
        ],
    },
};
