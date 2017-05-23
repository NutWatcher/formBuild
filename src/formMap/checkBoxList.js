/**
 * Created by lyy on 2017/1/1.
 */
const MapCheckBoxList = {
    config: {
        type: "ComCheckBoxList",
        label:"多选框",
        tip:"",//提示
        description:"",//给用户的字段说明
        label:"多选框",//标题
        min:"",
        max:"",
        length:"l",//input显示长度
        value:["选项2"],//默认值,
        submit:true,
        require:false,//是否必须输入
        withImage: false,//是否带图片
        options:[
            {times:0, cycle:"每天", showTimes:false, name:"选项1",value:"选项1",checked:false,
                src:window.formBuildState.ImageLocation + "/blank.png"},
            {times:0, cycle:"每天", showTimes:false, name:"选项2",value:"选项2",checked:true,
                src:window.formBuildState.ImageLocation + "/blank.png"},
            {times:0, cycle:"每天", showTimes:false, name:"选项3",value:"选项3",checked:false,
                src:window.formBuildState.ImageLocation + "/blank.png"}
        ]
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "多选框" }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[{name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false}]
            },
            {
                type: "ComSelectSingle",uId: "length", length:"xxl",
                label: "布局", value: "l", options: [
                {name:"一列",value:"l"},{name:"两列",value:"m"},{name:"三列",value:"s"},{name:"自动排列",value:"auto"}]
            }],
        [
            {type: "ComPropertySelectBox", label: "选择项", uId: "settingOptions",
                selectType:"checkbox",needCheckBox:true, withImage: false,//是否带图片
                tip:"此属性用于指定有哪些选择项可以提供给用户选择。利用旁边的增加或删除按钮以增加或删除选择项。对于下拉框在没有指定默认选中项的情况下将自动选中第一项。",
                options: [
                    {times:0, cycle:"每天", showTimes:false, name:"选项1",value:"选项1",checked:false,
                        src:window.formBuildState.ImageLocation + "/blank.png"},
                    {times:0, cycle:"每天", showTimes:false, name:"选项2",value:"选项2",checked:true,
                        src:window.formBuildState.ImageLocation + "/blank.png"},
                    {times:0, cycle:"每天", showTimes:false, name:"选项3",value:"选项3",checked:false,
                        src:window.formBuildState.ImageLocation + "/blank.png"}
                ]
            }],
        [
            {
                type: "ComNumberBox", label: "最少选择几项", uId: "min", length:"l",
                value: "", tip: "数值型字段用于限定选择数量"
            },
            {
                type: "ComNumberBox", label: "最多选择几项", uId: "max", length:"l",
                value: "", tip: "数值型字段用于限定选择数量"
            }],
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", height:"l",
                tip:"对字段进行解释，帮助填表人进行理解和输入。",
                value: ""}],
    ]
};
export default MapCheckBoxList