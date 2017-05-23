/**
 * Created by lyy on 2017/1/1.
 */
const MapImageBox = {
    config:{
        type: "ComImageBox",
        label:"图片",
        src: window.formBuildState.ImageLocation + "/imageDefault.png",
        value:"",
        description:""
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "图片"}],
        [
            {
                type: "ComPropertyFileUploadBox", dispatchSrc:true,  picker:"ComImageBox_uploadImage",
                label: "上传图片", uId: "src", value: "", tip: "在表单中添加图片显示", autoUpload:true,
                accept:"image"
            }],
       /* [
            {
                type: "ComTextBox",
                label: "图片地址", uId: "src", value: "/public/base/image/imageDefault.png", tip: "输入互联网地址"
            }],*/
        [
            {type: "ComTextAreaBox", label: "字段说明", uId: "description", Value: ""}]
    ]
};
export default MapImageBox