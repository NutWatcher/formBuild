/**
 * Created by lyy on 2017/1/1.
 */
const MapMultipleCheckBox = {
    config: {
        type: "ComMultipleCheckBox",
        tip:"",//提示
        description:"",//给用户的字段说明
        label:"组合单选框",//标题
        length:"l",//input显示长度
        submit:true,
        require:false,//是否必须输入
        showNumber:true,
        value:[
            {name:"行标签一",value:"选项2",checkedIndex:1},
            {name:"行标签二",value:"选项2",checkedIndex:1},
            {name:"行标签三",value:"选项2",checkedIndex:1}
        ],
        rowOptions:[
            { name:"行标签一",value:"行标签一"},
            { name:"行标签二",value:"行标签二"},
            { name:"行标签三",value:"行标签三"}
        ],
        options:[
            { name:"选项1",value:"选项1",checked:false},
            { name:"选项2",value:"选项2",checked:true},
            { name:"选项3",value:"选项3",checked:false}
            ]
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "组合单选框" }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[
                    {name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false},
                    {name: "显示数字", matchKey: "showNumber", uId:"showNumber",
                        tip: "在单选框下方通常都有一个数字用于标识此选项的分值，此属性用于指定是否隐藏此数字。", checked:true}
                    ]
            }],
        [
            {type: "ComPropertyMultipleCheckBox", label: "行标签", uId: "rowOptions",
                tip:"此属性用于指定有哪些选择项可以提供给用户选择。利用旁边的增加或删除按钮以增加或删除选择项。对于下拉框在没有指定默认选中项的情况下将自动选中第一项。",
                options: [
                    { name:"行标签一",value:"行标签一"},
                    { name:"行标签二",value:"行标签二"},
                    { name:"行标签三",value:"行标签三"}
                ]
            }],
        [
            {type: "ComPropertySelectBox", label: "选择项", uId: "settingOptions", isPropertyForComMultipleCheckBox:true,
                selectType:"radio",needCheckBox:false, withImage: false,//是否带图片
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
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", height:"l",
                tip:"对字段进行解释，帮助填表人进行理解和输入。",
                value: ""}]
    ]
};
export default MapMultipleCheckBox