/**
 * Created by lyy on 2017/1/5.
 */
const MapHtmlBox = {
    config: {
        type: "ComHtmlBox",
        separator:"",//带有分隔符
        label:"描述文字",//标题
        value:"这里输入html内容",//值,
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "描述文字" }],
        [
            {type: "ComEditTextArea", label: "Html内容", uId:"value" ,value: "这里输入html内容"}]
    ]
};
export default MapHtmlBox