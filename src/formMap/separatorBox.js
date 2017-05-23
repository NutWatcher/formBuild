/**
 * Created by lyy on 2017/1/5.
 */
const MapSeparatorBox = {
    config: {
        type: "ComHtmlBox",
        separator:"true",//带有分隔符
        label:"分隔符",//标题
        value:"这里是分隔符说明",//值,
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "分隔符" }],
        [
            {type: "ComEditTextArea", label: "Html内容", uId:"value" ,value: "这里是分隔符说明"}]
    ]
};
export default MapSeparatorBox