/**
 * Created by lyy on 2017/1/1.
 */
const MapTelephoneBox = {
    config: {
        type: "ComTelephoneBox",
        label:"电话",//标题,
        showType: "手机",
        length:"m",//input显示长度
        value:"",
        valueOption:["","",""],//默认值,
        description:"",//给用户的字段说明
        submit:true,//是否提交到表单
        require:false//是否必须输入
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "电话" }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[{name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false}]
            },
            {
                type: "ComSelectSingle",uId: "showType", length:"xxl",//input显示长度
                label: "电话格式", value: "手机", options: [
                {name:"座机",value:"座机"},{name:"手机",value:"手机"}]
            }],
        [
            {
                propertyHide:false,
                type: "ComTextBox", label: "默认值", uId: "value", value: "",length:"m",
                tip: "在用户访问表单时，此值将作为默认值显示在输入框中。如果不需要默认值，请将此处设置为空。"
            },
            {
                propertyHide:true,showType: "座机",
                type: "ComTelephoneBox", label: "默认值", uId: "value", value: "",valueOption:["","",""],
                length:"l", tip: "在用户访问表单时，此值将作为默认值显示在输入框中。如果不需要默认值，请将此处设置为空。"
            }],
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", height:"l",
                tip:"对字段进行解释，帮助填表人进行理解和输入。",
                value: ""}]

    ]
};
export default MapTelephoneBox