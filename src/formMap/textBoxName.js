/**
 * Created by lyy on 2017/1/1.
 */
const MapTextBoxName = {
    config: {
        type: "ComNameBox",
        label:"姓名",//标题
        length:"普通",//input显示长度
        value:"",
        valueOption:["","",""],//默认值,
        description:"",//给用户的字段说明
        submit:true,//是否提交到表单
        require:false//是否必须输入
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "姓名" }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[{name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false}]
            },
            {
                type: "ComSelectSingle",uId: "length", length:"xxl",//input显示长度
                label: "姓名格式", value: "普通", options: [
                {name:"普通",value:"普通"},{name:"加长",value:"加长"}]
            }],
       /* [
            {
                type: "ComTextBox", label: "默认值", uId: "value", value: "",length:"xxl",
                tip: "在用户访问表单时，此值将作为默认值显示在输入框中。如果不需要默认值，请将此处设置为空。"
            }],*/
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", height:"l",
                tip:"对字段进行解释，帮助填表人进行理解和输入。",
                value: ""}]

    ]
};
export default MapTextBoxName