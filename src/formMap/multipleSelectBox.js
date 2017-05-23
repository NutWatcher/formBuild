/**
 * Created by lyy on 2017/1/3.
 */
const MapMultipleSelectBox = {
    config: {
        type: "ComMultipleSelectBox",
        tip:"",//提示
        description:"",//给用户的字段说明
        label:"多级下拉框",//标题
        value:["",""],//默认值,
        submit:true,
        require:false,//是否必须输入
        selectNum:2,
        configList:[
            {value:"",options:["选项1","选项2"]},
            {value:"",options:[]}
        ],
        select:["选项1","-选项12"],
        optionsList:{"child":[{"name":"选项1","child":[{"name":"-选项11","child":[],"faPoint":""},{"name":"-选项12","child":[],"faPoint":""}],"faPoint":""},
            {"name":"选项2","child":[{"name":"-选项21","child":[],"faPoint":""},{"name":"-选项22","child":[],"faPoint":""}],"faPoint":""}],"start":true,"faPoint":""},
        options:"选项1￥￥-选项11￥￥-选项122￥￥选项2￥￥-选项21￥￥-选项22"
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "多级下拉框" }],
        [
            {type: "ComCheckBoxList", label: "设置", uId: "settingCheckbox",tip: "",
                options:[{name: "必须输入", matchKey: "require", uId:"require",
                    tip: "用户必须输入此字段，否则将不能提交表单。", checked:false}]
            },
            {type: "ComSelectSingle", label: "层级", uId: "selectNum", value: 2 ,length:"xxl",
                options:[
                    {times:5, cycle:"每天", value:"2", name:"2"},
                    {times:0, cycle:"每天", value:"3", name:"3"},
                    {times:0, cycle:"每天", value:"4", name:"4"}]
            }],
        [
            {type: "ComTextAreaBox", label: "选择项", uId: "options", height:"l",
                tip:"“-”的个数表示层级数（“-”为英文减号）。",
                value: "选项1\n-选项11\n-选项12\n选项2\n-选项21\n-选项22"}],
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", height:"l",
                tip:"对字段进行解释，帮助填表人进行理解和输入。",
                value: ""}]
    ]
};
export default MapMultipleSelectBox