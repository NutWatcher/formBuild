/**
 * Created by lyy on 2017/1/9.
 */
const MapFileUploadBox = {
    config: {
        type: "ComFileUploadBox",
        label:"文件上传",//标题
        value:[],//默认值,
        fileSingleSizeLimit:"2",
        fileType:"",
        description:"",//给用户的字段说明
        submit:true,//是否提交到表单
        require:false,//是否必须输入
        date:"",
        dispatchSrc:false //作为属性控件时，设置是否更新store数据
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "文件上传" }],
        [
            {type: "ComNumberBox", label: "文件上传大小/M",
                tip: "上传的文件只能小于此处设置的文件大小",
                uId: "fileSingleSizeLimit", value: "2" }],
        [
            {type: "ComTextAreaBox", label: "文件上传格式(文件格式以英文逗号[,]分隔)", uId: "fileType", value: "" }],
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
export default MapFileUploadBox