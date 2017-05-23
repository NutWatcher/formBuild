/**
 * Created by lyy on 2017/1/10.
 */
const MapLocationBox = {
    config: {
        type: "ComLocationBox",
        label:"地理位置",//标题
        value:"",
        description:"",
        submit:true,//是否提交到表单
        require:false,//是否必须输入
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "地理位置" }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[{name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false}]
            }],
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", height:"l",
                tip:"对字段进行解释，帮助填表人进行理解和输入。",
                value: ""}]
    ]
};
export default MapLocationBox