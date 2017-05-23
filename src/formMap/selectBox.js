/**
 * Created by lyy on 2017/1/3.
 */
const MapSelectBox = {
    config: {
        type: "ComSelectSingle",
        tip:"",//提示
        label:"下拉框",//标题
        length:"m",//input显示长度
        value:"选项一",//默认值,
        description:"",
        submit:true,//是否提交到表单
        require:false,//是否必须输入
        withImage: true,//是否带图片
        options:[
            {
                times:0, cycle:"每天", value:"选项一", name:"选项一",src:""
            },
            {
                times:0, cycle:"每天", value:"选项二", name:"选项二",src:""
            },
            {
                times:0, cycle:"每天", value:"选项三", name:"选项三",src:""
            }
        ]
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "下拉框" }],
        [
            {
                type: "ComSelectSingle",uId: "length",
                label: "字段长度", value: "m", options: [{name:"短",value:"s"},{name:"中",value:"m"},{name:"长",value:"xxl"}]
            }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[{name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false}]
            }],
        [
            {type: "ComPropertySelectBox", label: "选择项", uId: "settingOptions",
                selectType:"radio",needCheckBox:false, withImage: false,//是否带图片
                tip:"此属性用于指定有哪些选择项可以提供给用户选择。利用旁边的增加或删除按钮以增加或删除选择项。对于下拉框在没有指定默认选中项的情况下将自动选中第一项。",
                options: [
                    {times:5, cycle:"每天", showTimes:false, name:"选项一",value:"选项一",checked:true,src:""},
                    {times:5, cycle:"每天", showTimes:false, name:"选项二",value:"选项二",checked:false,src:""},
                    {times:5, cycle:"每天", showTimes:false, name:"选项三",value:"选项三",checked:false,src:""}
                ]
            }],
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", height:"l",
                tip:"对字段进行解释，帮助填表人进行理解和输入。",
                value: ""}]
        
    ]
};
export default MapSelectBox