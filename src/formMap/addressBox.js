/**
 * Created by lyy on 2017/1/1.
 */
let address = window.formBuildState.address;
let provList=[];
for(var i in address){
    provList.push(i);
}
const MapAddressBox = {
    config: {
        type: "ComAddressBox",
        label:"地址",//标题
        value:"",//提交的值,
        provValue:"省/自治区/直辖市",
        provOptions:provList,
        cityValue:"市",
        cityOptions:[],
        areaValue:"区",
        areaOptions:[],
        address:"",
        description:"",//给用户的字段说明
        submit:true,//是否提交到表单
        require:false,//是否必须输入
    },
    propertyConfig: [
        [
            {type: "ComTextAreaBox", label: "字段名称", uId: "label", value: "地址" }],
        [
            {type: "ComAddressBox", label: "默认值", uId: "address", provValue:"省/自治区/直辖市",
                provOptions:provList, cityValue:"市", cityOptions:[], areaValue:"区",
                areaOptions:[], address:"" }],
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
export default MapAddressBox