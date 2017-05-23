/**
 * Created by lyy on 2017/1/1.
 */
const MapRadioBoxList = {
    config: {
        type: "ComRadioBoxList",
        tip:"",//提示
        description:"",//给用户的字段说明
        label:"单选框",//标题
        length:"l",//input显示长度
        value:"选项2",//默认值,
        submit:true,
        other:false,
        otherChecked:false,
        otherValue:"",
        otherImage:window.formBuildState.ImageLocation + "/blank.png",
        randomValue:false,
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
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "单选框" }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[{name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false},
                    {name: "其他选项", matchKey: "other", uId:"other",
                        tip: "此属性用于指定是否可以让用户输入除选择项以外的其他值。", checked:false},
                    {name: "随机选项", matchKey: "randomValue", uId:"randomValue",
                        tip: "此属性用于指定单选框中的选项在访问时出现的顺序是否是随机的。如果勾选，则选择项在每次访问时出现的顺序是随机的。",
                        checked:false}]
            },
            {
                type: "ComSelectSingle",uId: "length", length:"xxl",
                label: "布局", value: "l", options: [
                {name:"一列",value:"l"},{name:"两列",value:"m"},{name:"三列",value:"s"},{name:"自动排列",value:"auto"}]
            }],
        [
            {type: "ComPropertySelectBox", label: "选择项", uId: "settingOptions",
                showOtherOption:false, showOtherOptionImage:window.formBuildState.ImageLocation + "/blank.png",
                selectType:"radio",needCheckBox:true, withImage: false,//是否带图片
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
export default MapRadioBoxList