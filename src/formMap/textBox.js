/**
 * Created by lyy on 2017/1/1.
 */
const MapTextBox = {
    config: {
        type: "ComTextBox",
        label:"单行文本",//标题
        length:"m",//input显示长度
        max:"", //最大字符输入
        min:"",//最小字符输入
        value:"",//默认值,
        description:"",//给用户的字段说明
        submit:true,//是否提交到表单
        require:false,//是否必须输入
        hidden:false
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "单行文本" }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[{name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false},
                    {name: "隐藏", matchKey: "hidden", uId:"require",
                        tip: "", checked:false}]
            },
            {
                type: "ComSelectSingle",uId: "length", length:"xxl",//input显示长度
                label: "字段长度", value: "m", options: [{name:"短",value:"s"},{name:"中",value:"m"},{name:"长",value:"xxl"}]
            }],
        [
            {
                type: "ComTextBox", label: "默认值", uId: "value", value: "",length:"xxl",
                tip: "在用户访问表单时，此值将作为默认值显示在输入框中。如果不需要默认值，请将此处设置为空。"
            }],
        [
            {
                type: "ComNumberBox", label: "最小长度", uId: "min", length:"l",
                value: "", tip: "数值型字段用于限定字符的长度"
            },
            {
                type: "ComNumberBox", label: "最大长度", uId: "max", length:"l",
                value: "", tip: "数值型字段用于限定字符的长度"
            }],
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", height:"s",
                tip:"对字段进行解释，帮助填表人进行理解和输入。",
                value: ""}]

    ]
};
export default MapTextBox