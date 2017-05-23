/**
 * Created by lyy on 2017/1/1.
 */
const MapNumberBox = {
    config: {
        type: "ComNumberBox",
        label:"数字框",//标题
        length:"m",//input显示长度
        max:"", //最大字符输入
        min:"0",//最小字符输入
        value:"",//默认值,
        description:"",
        validated:"",
        submit:true,//是否提交到表单
        require:false,//是否必须输入
        date:""
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "数字框" }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[{name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false}]
            },
            {
                type: "ComSelectSingle",uId: "length", length:"xxl",
                label: "字段长度", value: "m", options: [{name:"短",value:"s"},{name:"中",value:"m"},{name:"长",value:"l"}]
            }],
        [
            {
                type: "ComNumberBox", label: "最小值", uId: "min", length:"l",
                value: "", tip: "数值型字段用于限定数值的范围"
            },
            {
                type: "ComNumberBox", label: "最大值", uId: "max", length:"l",
                value: "", tip: "数值型字段用于限定数值的范围"
            }],
        [
            {
                type: "ComNumberBox", label: "默认值", uId: "value", length:"l",
                value: "", tip: "在用户访问表单时，此值将作为默认值显示在输入框中。如果不需要默认值，请将此处设置为空。"
            }],
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", value: ""}],
    ]
};
export default MapNumberBox