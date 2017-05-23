/**
 * Created by lyy on 2017/1/1.
 */
/**
 * 表单页面属性
 * @type {{config: {type: string, label: string, src: string, value: string}, propertyConfig: [*]}}
 */
const MapHeadBox = {
    select:true,
    config:{
        name:"头图",
        title:"页面标题",
        description:"描述",
        mark:"",
        headImage:"",
        backgroundImage:""
    },
    propertyConfig: [
        [
            {
                type: "ComTextBox",
                label: "页面标题", uId: "title", value: "页面标题", tip: "输入页面标题"
            }],
        [
            {
                type: "ComTextBox",
                label: "描述", uId: "description", value: "描述", tip: "输入描述"
            }],
        [
            {
                type: "ComPropertyFileUploadBox", dispatchSrc:true,  picker:"ComFileUploadBox_headImage",
                label: "头图", uId: "headImage", value: "", tip: "表单上方图片", autoUpload:true,
                accept:"image"
            }],
        [
            {
                type: "ComPropertyFileUploadBox", dispatchSrc:true,  picker:"ComFileUploadBox_backgroundImage",
                label: "背景图", uId: "backgroundImage", value: "", tip: "表单背景图", autoUpload:true,
                accept:"image"
            }]
    ]
};
export default MapHeadBox