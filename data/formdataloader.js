export default { "javaClass": "com.huawei.sdm.page.extend.mobile.container.MobilePage", "fullScreen": true, "includes": [], "body": [{ "javaClass": "com.huawei.sdm.page.extend.mobile.form.MFormPanel", "id": "main_form", "formDataLoader": { "javaClass": "com.huawei.sdm.page.extend.mobile.form.MFormDataLoader", "serviceId": "leave_information_get", "parameters": "{\"leave_id\":\"#Get[leave_id]\"}", "cache": true }, "validations": [], "datafields": [{ "javaClass": "com.huawei.sdm.page.extend.mobile.form.datafield.MTextArea", "id": "leave_id", "name": "leave_id", "readOnly": true, "label": "请假单号", "canCopy": false, "isOpenHistorys": false, "type": "textArea" }, { "javaClass": "com.huawei.sdm.page.extend.mobile.form.datafield.MTextArea", "id": "applicant", "name": "applicant", "readOnly": true, "label": "申请人", "canCopy": false, "isOpenHistorys": false, "type": "textArea" }, { "javaClass": "com.huawei.sdm.page.extend.mobile.form.datafield.MTextArea", "id": "leave_type", "name": "leave_type", "readOnly": true, "label": "请假类型", "canCopy": false, "isOpenHistorys": false, "type": "textArea" }, { "javaClass": "com.huawei.sdm.page.extend.mobile.form.datafield.MTextArea", "id": "start_time", "name": "start_time", "readOnly": true, "label": "开始时间", "canCopy": false, "isOpenHistorys": false, "type": "textArea" }, { "javaClass": "com.huawei.sdm.page.extend.mobile.form.datafield.MTextArea", "id": "end_time", "name": "end_time", "readOnly": true, "label": "结束时间", "canCopy": false, "isOpenHistorys": false, "type": "textArea" }, { "javaClass": "com.huawei.sdm.page.extend.mobile.form.datafield.MTextArea", "id": "days", "name": "days", "readOnly": true, "label": "所占自然天数", "canCopy": false, "isOpenHistorys": false, "type": "textArea" }, { "javaClass": "com.huawei.sdm.page.extend.mobile.form.datafield.MTextArea", "id": "reason", "name": "reason", "readOnly": true, "label": "请假原因", "canCopy": false, "isOpenHistorys": false, "type": "textArea" }], "buttons": [] }], "header": { "javaClass": "com.huawei.sdm.page.extend.mobile.container.MHeader", "text": "审批", "buttons": [{ "javaClass": "com.huawei.sdm.page.extend.mobile.button.MBackButton", "iconClass": "ion-close" }] }, "footer": { "javaClass": "com.huawei.sdm.page.extend.mobile.container.MFooter", "buttons": [{ "javaClass": "com.huawei.sdm.page.extend.mobile.button.MServiceButton", "text": "驳回发起人", "parameters": "{\"leave_id\":\"#Form[main_form.leave_id]\",\"status\":\"驳回\"}", "accessControl": false, "serviceId": "leave_information_update", "successTo": "leave_lists", "successMessage": "操作成功", "ignoreItemPageHistory": false, "canUseWhenOffline": true }, { "javaClass": "com.huawei.sdm.page.extend.mobile.button.MServiceButton", "text": "不通过", "parameters": "{\"leave_id\":\"#Form[main_form.leave_id]\",\"status\":\"不通过\"}", "accessControl": false, "serviceId": "leave_information_update", "successTo": "leave_lists", "successMessage": "操作成功", "ignoreItemPageHistory": false, "canUseWhenOffline": true }, { "javaClass": "com.huawei.sdm.page.extend.mobile.button.MServiceButton", "text": "审批通过", "parameters": "{\"leave_id\":\"#Form[main_form.leave_id]\",\"status\":\"通过\"}", "accessControl": false, "serviceId": "leave_information_update", "successTo": "leave_lists", "successMessage": "审批成功", "ignoreItemPageHistory": false, "canUseWhenOffline": true }], "buttonsGroups": [] } }