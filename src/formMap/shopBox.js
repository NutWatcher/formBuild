/**
 * Created by lyy on 2017/1/9.
 */
const MapShopBox = {
    config: {
        type: "ComShopBox",
        label: "商品",//标题
        value: [],//默认值,
        description:"",//给用户的字段说明
        submit:true,//是否提交到表单
        require:false,//是否必须输入
        withImage: false,//是否带图片
        options: [
            { value:0,shopName:"商品1",unitPrice:3,unitName:"袋",description:"",currency:"￥",rate:1,
                src:window.formBuildState.ImageLocation + "/blank.png"},
            { value:0,shopName:"商品2",unitPrice:3,unitName:"袋",description:"",currency:"￥",rate:1,
                src:window.formBuildState.ImageLocation + "/blank.png"},
            { value:0,shopName:"商品3",unitPrice:3,unitName:"袋",description:"",currency:"￥",rate:1,
                src:window.formBuildState.ImageLocation + "/blank.png"}
        ]
    },
    propertyConfig: [
        [
            {type: "ComShopPropertyBox", tip:"213",label: "商品列表", uId: "ShopPropertyBox",withImage: false,//是否带图片
                shopList: [
                    {shopName:"商品1",unitPrice:3,unitName:"袋",description:"",select:false,currency:"￥",rate:1,
                        src:window.formBuildState.ImageLocation + "/blank.png"},
                    {shopName:"商品2",unitPrice:3,unitName:"袋",description:"",select:false,currency:"￥",rate:1,
                        src:window.formBuildState.ImageLocation + "/blank.png"},
                    {shopName:"商品3",unitPrice:3,unitName:"袋",description:"",select:false,currency:"￥",rate:1,
                        src:window.formBuildState.ImageLocation + "/blank.png"}
                ] }],
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "商品" }],
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
export default MapShopBox