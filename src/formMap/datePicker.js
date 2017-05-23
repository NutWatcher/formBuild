/**
 * Created by lyy on 2017/1/3.
 */
var moment = require('moment');
const MapDatePickerBox = {
    config: {
        type: "ComDatePickerBox",
        label:"日期",//标题
        length:"m",//input显示长度
        value:moment().format('YYYY-MM-DD'),//默认值,
        description:"",
        dataStyle:"YYYY-MM-DD",
        submit:true
    },
    propertyConfig: [
        [
            {type: "ComTextBox", label: "字段名称", uId: "label", value: "日期" }],
        [
            {type: "ComTextBox", label: "默认值", uId: "value",length:"xxl",
                tip:"在用户访问表单时，此值将作为默认值显示在输入框中“YYYY-MM-DD”格式的固定日期，不填则默认为当天。",
                value: "" }],
        [
            {
                type: "ComSelectSingle",uId: "dataStyle", length:"xxl",
                label: "日期格式", value: "dataStyle", options: [
                {name:"YYYY-MM-DD",value:"YYYY-MM-DD"},
                {name:"DD/MM/YYYY",value:"DD/MM/YYYY"},
                {name:"MM/DD/YYYY",value:"MM/DD/YYYY"}]}],
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", value: "" }]
    ]
};
export default MapDatePickerBox