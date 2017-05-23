/**
 * Created by lyy on 2017/1/11.
 */
const ComNumberBox = (config) =>{
    if (config.require == true || config.value.trim().length > 0){
        if (config.value.trim() == "")
        {
            config.validated = "该字段不允许为空，请输入数据。";
            return false;
        }
        let min = config.min ;
        let max = config.max ;
        console.log("number");
        console.log(config.value);
        if (isNaN(min) == false){
            if (parseFloat(config.value) < parseFloat(min)){
                config.validated = "该字段不能小于" + min + "。";
                return false;
            }
        }
        if (isNaN(max) == false){
            if (parseFloat(config.value) > parseFloat(max)){
                config.validated = "该字段不能大于" + max + "。";
                return false;
            }
        }
    }
    config.validated = "";
    return true ;
};
const ComTextBox = (config) =>{
    if (config.require == true){
        if (config.value.trim() == "")
        {
            config.validated = "该字段不允许为空，请输入数据。";
            return false;
        }

    }
    let min = config.min ;
    let max = config.max ;
    if (isNaN(min) == false){
        if (config.value.length < parseFloat(min)){
            config.validated = "该字段长度不能小于" + min + "。";
            return false;
        }
    }
    if (isNaN(max) == false){
        if (config.value.length > parseFloat(max)){
            config.validated = "该字段长度不能大于" + max + "。";
            return false;
        }
    }
    config.validated = "";
    return true ;
};
const ComCheckBoxList = (config) =>{
    if (config.require == true){
        if (config.value.length == 0)
        {
            config.validated = "该字段不允许为空，请输入数据。";
            return false;
        }
    }
    console.log("ComCheckBoxList validate");
    console.log(config.value);
    let min = config.min ;
    let max = config.max ;
    if (isNaN(min) == false){
        if (config.value.length < parseFloat(min)){
            config.validated = "选择数量不能小于" + min + "。";
            return false;
        }
    }
    if (isNaN(max) == false){
        if (config.value.length > parseFloat(max)){
            config.validated = "选择数量不能大于" + max + "。";
            return false;
        }
    }
    config.validated = "";
    return true ;
};
const ComFileUploadBox = (config) =>{
    if (config.require == true){
        let flag = false ;
        for (let key in window.lyyStatePicker){
            let item = window.lyyStatePicker[key];
            if (item.uId == config.uId){
                if (item.oldFileList.length > 0){
                    flag = true ;
                }
                for (let i = 0 ; i < item.fileList.length ; i ++){
                    if (item.deleteList[i] == true){
                        flag = true ;
                    }
                }
            }
        }
        if (flag == false)
        {
            config.validated = "上传文件不许为空。";
            return false;
        }
    }

    console.log("ComFileUploadBox validate");
    config.validated = "";
    return true ;
};
const ComTelephoneBox = (config) =>{
    if (config.require == true || config.value.trim().length > 0) {
        if (config.showType == "手机") {
            console.log(config.value.length);
            console.log(isNaN(config.value));
            if (isNaN(config.value) == true || config.value.length != 11) {
                config.validated = "请输入正确的11位手机号码";
                return false;
            }
        }
    }
    console.log("ComTelephoneBox validate");
    config.validated = "";
    return true ;
};
const ComAddressBox = (config) =>{
    if (config.require == true ) {
        if (config.provValue == "省/自治区/直辖市"||
            config.cityValue == "市"||
            config.areaValue == "区"||
            config.address.trim() == "")
        {
            config.validated = "请选择正确的地址";
            return false;
        }
    }
    console.log("ComAddressBox validate");
    config.validated = "";
    return true ;
};
const ComMultipleSelectBox = (config) =>{
    if (config.require == true ) {
        for (let i = 0 ; i < config["selectNum"] ; i ++){
            if (config["value"][i] == ""){
                config.validated = "请选择选项";
                return false;
            }
        }
    }
    console.log("ComMultipleSelectSingle validate");
    config.validated = "";
    return true ;
};
const ComTimeBox = (config) =>{
    if (config.require == true ) {

        if (config["valueHour"] == " "){
            config.validated = "请选择选项";
            return false;
        }
        if (config["valueMinute"] == " "){
            config.validated = "请选择选项";
            return false;
        }
    }
    console.log("ComTimeBox validate");
    config.validated = "";
    return true ;
};

module.exports = {
    ComFileUploadBox:ComFileUploadBox,
    ComNumberBox : ComNumberBox,
    ComTextBox : ComTextBox,
    ComTextAreaBox : ComTextBox,
    ComCheckBoxList:ComCheckBoxList,
    ComTelephoneBox:ComTelephoneBox,
    ComAddressBox:ComAddressBox,
    ComMultipleSelectBox:ComMultipleSelectBox,
    ComTimeBox:ComTimeBox
};