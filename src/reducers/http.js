/**
 * Created by lyy on 2017/1/8.
 */
import * as Util from  '../actions/util'
const Base_Template  = (state , action, params) => {
    console.log("Load_TemplateError in");
    state.active = true;
    state.showBtn = params.showBtn;
    state.content = params.content + action.data;
    state.title = params.title;
    state.formSuccess = false ;
    return state;
};


//加载模板
const Load_TemplateSuccess = (state , action) => {
    console.log("Load_TemplateSuccess in");
    try {
        let template = action.data;
        window.lyyStateTemp = {
            templateId: template.id,
			version: template.version
        }
        state.template = {
            id: template.id,
            version: template.version,
            mark: template.mark,
            hidden:template.hidden || "-1"
        };
        if (template.property) {
            state.pageState = JSON.parse(template.property);
            state.pageState["pageChange"] = false;
        }
        else{
            //新表单，表单头使用外部变量
           // state.pageState = JSON.parse(JSON.stringify(state.pageState));
            state.pageState["pageChange"] = true;
            state.pageState.config["title"] = template.title;
            state.pageState.config["description"] = template.description;
            for (let i = 0 ; i < state.pageState.propertyConfig.length ; i ++){
                if (state.pageState.propertyConfig[i][0]["uId"] == "title"){
                    state.pageState.propertyConfig[i][0]["value"] = template.title;
                }
                if (state.pageState.propertyConfig[i][0]["uId"] == "description"){
                    state.pageState.propertyConfig[i][0]["value"] = template.description;
                }
            }
        }
        state["index"] = 0;
        state.list = [];

        let list = template.component ||[];
        let newList = [];//加入主页面渲染列表
        list.map((panel, index)=> {
            let tempPanel = JSON.parse(panel.property);
            tempPanel.id = panel.id;
            newList.push(tempPanel);
            if (tempPanel.uId > state["index"]) {
                state["index"] = tempPanel.uId;
            }
        });
        newList.sort(function (a,b) {
            return a.order - b.order;
        });
        state.list = [...state.list ,...newList];
        let haveSelect = false ;
        state.list.map((panel, index)=>{
            if (panel.select == true){
                haveSelect = true;
                state.eventList.autoSelect = {
                    uId :panel.uId,
                    newPanel:panel.propertyComponents,
                    select:true
                };
            }
        });
        state["index"]++;
        if (haveSelect == false) {
            state.eventList.autoSelect = {
                select: true,
                pageState: true
            };
        }
    }
    catch (e){
        alert("加载文件出错" + e.toString());
    }
   // console.log(state);
    return state
};
const Load_FormTemplateSuccess = (state , action) => {
    console.log("Load_FormTemplateSuccess in");
    let list = [];
    try {
        let template = action.data;
        //state.json="";
        state.template = {
            id: template.id,
            version: template.version,
            mark: template.mark,
            hidden:template.hidden || "-1"
        };
        state.loadTemplate = true;
        state.pageState = JSON.parse(template.property).config;
        state["index"] = 0;
        state.list = [];


        list = template.component ||[];
        let newList = [];//加入主页面渲染列表
        list.map((panel, index)=> {
            let tempPanel = JSON.parse(panel.property);
            tempPanel.id = panel.id;
            newList.push(tempPanel);
        });
        newList.sort(function (a,b) {
            return a.order - b.order;
        });
        newList.sort(function (a,b) {
            return a.order - b.order;
        });
        console.log(state);
        state.list = [...newList];
    }
    catch (e){
        alert("加载文件出错" + e.toString());
    }
 //   console.log(state);
    return {...state};
};
const Load_FormDataSuccess = (state , action) => {
    // console.log("Load_FormDataSuccess in");
    //n*n的复杂度
    let list = [];
    let valueList = action.data.component;
    let newList = [];
    //console.log(valueList);
    try {
        state.list.map((panel,index)=>{
            panel.components.map((component, comIndex)=>{
                valueList.map((value, valueIndex) =>{
                    if ( value.id == panel.id){
                        if (component.type == "ComNameBox"){
                            component.value = value.value ;
                            if (component.length == "普通"){
                                component.valueOption[0] = value.value ;
                            }
                            else{
                                let temp = value.value.split("-");
                                component.valueOption[0] = temp[0] || "";
                                component.valueOption[1] = temp[1] || "";
                                component.valueOption[2] = temp[2] || "";
                            }
                            component.valueOption = [...component.valueOption];
                        }
                        else if (component.type == "ComCheckBoxList"){
                            component["value"] = value.value;
                            component["options"].map((option, index)=>{
                                option["checked"] = false;
                                value.value.map((item, itemIndex) =>{
                                    if (option["name"] == item){
                                        option["checked"] = true;
                                    }
                                })
                            });
                        }
                        else if (component.type == "ComRadioBoxList"){
                            let select = false ;
                            component["value"] = value.value;
                            component["options"].map((option, index)=>{
                                option["checked"] = false;
                                console.log(option["name"]);
                                console.log(value.value);
                                if (option["name"] == value.value){
                                    option["checked"] = true;
                                    select = true;
                                }
                            });
                            if (select == false && value.value != ""){
                                component["otherChecked"] = true;
                                component["otherValue"] = value.value;
                            }
                            console.log(component);
                            component["options"] = [...component["options"]];
                        }
                        else if (component.type == "ComSelectSingle"){
                            // console.log("ComSelectSingle");
                            // console.log(component);
                            // console.log(value.value );
                            component.value = value.value;
                        }
                        else if (component.type == "ComMultipleCheckBox"){
                            component.value = JSON.parse(value.value);
                        }
                        else if (component.type == "ComMultipleSelectBox"){
                            // console.log("ComMultipleSelectBox");
                            // console.log(component);
                            // console.log(value.value );
                            component.value = value.value;
                            let tempConfigList = [];
                            let tempDeepCheck = [false,false,false,false,false];
                            let deepIndex = 0;
                            function getChildren(children) {
                                children.map((child, index) => {
                                    console.log(deepIndex);
                                    console.log(value.value[deepIndex]);
                                    console.log(child.name);
                                    if(child.name == value.value[deepIndex] && tempDeepCheck[deepIndex] == false){
                                        tempDeepCheck[deepIndex] = true ;
                                        tempConfigList[deepIndex + 1] = child["child"];
                                        deepIndex++;
                                        getChildren(child["child"]);
                                        deepIndex--;
                                    }
                                });
                            }
                            getChildren(component["optionsList"]["child"]);
                            tempConfigList[0] = component["optionsList"]["child"];
                            let newConfigList = [];
                            for(let i = 0 ; i < value.value.length  ; i ++ ){
                                let tempOptions = [];
                                console.log(tempConfigList[i]);
                                if (tempConfigList[i]){
                                    for(let j = 0 ; j < tempConfigList[i].length ; j ++){
                                        tempOptions.push(tempConfigList[i][j].name);
                                    }
                                }
                                newConfigList.push({value: value.value[i], options: tempOptions});
                            }

                            component["configList"] = [...newConfigList];
                            component["value"] = value.value;
                        }
                        else if (component.type == "ComTelephoneBox"){
                            // console.log("ComTelephoneBox");
                            // console.log(component);
                            // console.log(value.value );
                            let temp = value.value.split("-");
                            if(temp.length == 3){
                                component.valueOption = temp;
                            }
                            else{
                                component.valueOption[0] = value.value;
                            }
                            component.value = value.value;
                        }
                        else if (component.type == "ComTimeBox"){
                            // console.log("ComTimeBox");
                            // console.log(component);
                            // console.log(value.value );
                            component.value = value.value;
                            component.valueHour = value.value.split(":")[0];
                            component.valueMinute = value.value.split(":")[1];

                        }
                        else if (component.type == "ComAddressBox"){
                            // console.log("ComAddressBox");
                            // console.log(component);
                            let tempValue = value.value.split("¥");
                            component.value = value.value;
                            component.provValue = tempValue[0]||"";
                            component.cityValue = tempValue[1]||"";
                            component.areaValue = tempValue[2]||"";
                            component.address = tempValue[3]||"";
                            let cityList=[];
                            if (window.formBuildState.address[component.provValue]){
                                for(var i in window.formBuildState.address[component.provValue]){
                                    cityList.push(i);
                                }
                                component.cityOptions = cityList;
                                if (window.formBuildState.address[component.provValue][component.cityValue]){
                                    component['areaOptions'] = window.formBuildState.address[component.provValue][component.cityValue];
                                }
                            }

                            // console.log(component);
                        }
                        else if (component.type == "ComShopBox"){
                            component.value = JSON.parse(value.value);
                            let tempValue = JSON.parse(value.value);
                            let tempCheckList = [];
                            component.options.map((item, index)=>{
                                tempValue.map((valueItem)=>{
                                    if(valueItem.index == index){
                                        item.value = valueItem.num;
                                        if(item.value && item.value > 0) {
                                            tempCheckList.push({
                                                name: item.shopName, index: index,rate:item.rate,
                                                num: item.value, price: item.unitPrice, unit: item.unitName
                                            })
                                        }
                                    }
                                })
                            })
                            state.checkState["shopList"].push(
                                {name:component["label"],uId:component["uId"], items:tempCheckList});

                            let count = 0 ;
                            state.checkState["shopList"].map((shops)=>{
                                console.log(shops);
                                shops.items.map((item)=>{
                                    count += item["price"] * item["num"] * item["rate"];
                                });
                            });
                            state.checkState["count"] = count ;
                            state.checkState["render"] ++ ;
                        }
                        else{
                            component.value = "";
                            component.value = value.value;
                        }
                    }
                })
            })
        });
        // state.list = newList;
        state.list = [...state.list];
    }
    catch (e){
        alert("加载文件出错" + e.toString());
    }
    state.loadTemplate = false;
    return {...state};
};
const Load_ShowFormDataSuccess = (state , action) => {
    //console.log("Load_ShowFormDataSuccess in");
    //n*n的复杂度
    let list = [];
    let valueList = action.data.component;
    let newList = [];
    console.log(valueList);
    try {
        state.list.map((panel,index)=>{
            panel.components.map((component, comIndex)=>{
                valueList.map((value, valueIndex) =>{
                    if ( value.id == panel.id){
                        if (component.submit == true){
                            if (component.type == "ComAddressBox"){
                                newList.push({
                                    type: component.type,
                                    label: component.label,
                                    value: value.value.replace(/¥/g,"")
                                })
                            }
                            else if (component.type == "ComRadioBoxList"){
                                if (component.otherChecked == true){
                                    newList.push({
                                        type: component.type,
                                        label: component.label,
                                        value: "其他:" + value.value.replace(/¥/g,"")
                                    })
                                }
                                else {
                                    newList.push({
                                        type: component.type,
                                        label: component.label,
                                        value: value.value.replace(/¥/g, "")
                                    })
                                }
                            }
                            else if (component.type == "ComMultipleSelectBox"){
                                let tempValue = [];
                                value.value.map((item, index)=>{
                                    tempValue.push( item.replace(/^-+/g,"") );
                                });

                                newList.push({
                                    type: component.type,
                                    label: component.label,
                                    value: tempValue
                                })
                            }
                            else if (component.type == "ComFileUploadBox"){
                                let tempValue = [];
                                value.value.map((item, index)=>{
                                    tempValue.push({name:item.name,src:item.url})
                                });

                                newList.push({
                                    type: component.type,
                                    label: component.label,
                                    value: tempValue
                                })
                            }
                            else if (component.type == "ComShopBox" ){
                                let tempValue = JSON.parse(value.value);
                                let tempList = [];
                                let count = 0 ;
                                component.options.map((item, index)=>{
                                    tempValue.map((valueItem)=>{
                                        if(valueItem.index == index){
                                            tempList.push({name:item.shopName, num:valueItem.num,
                                                price: item.unitPrice, unit: item.unitName, rate:item.rate});
                                            count += item["unitPrice"] * valueItem.num * item["rate"];
                                        }
                                    })
                                });
                                console.log("count " + count);
                                newList.push({
                                    type: component.type,
                                    label: component.label,
                                    count: count,
                                    value: tempList
                                })
                            }
                            else {
                                newList.push({
                                    type: component.type,
                                    label: component.label,
                                    value: value.value
                                })
                            }
                        }
                    }
                })
            })
        });
         state.list = newList;
        // state.list = [...state.list];
    }
    catch (e){
        alert("加载文件出错" + e.toString());
    }
    state.loadTemplate = false;
    return {...state};
};
const Load_TemplateError = (state , action) => {
    //console.log("Load_TemplateError in");
    Base_Template(state , action, {content:"加载模板信息出错:", title:"错误", showBtn: true});
    return state;
};
const Load_TemplateLoading = (state , action) => {
    //console.log("Load_TemplateLoading in");
    action.data = "";
    Base_Template(state , action, {content:"加载模板信息中...", title:"处理中", showBtn: false});
    return state;
};

//提交表单
const Save_FormSuccess = (state , action) => {
    //console.log("Save_FormSuccess in");
    //console.log("Load_TemplateError in");
    state.active = true;
    state.formSuccess = true ;
    state.redirect = true ;
    state.content = "提交成功，3秒后跳转";
    return state;
};
const Save_FormLoading = (state , action) => {
    //console.log("Save_FormLoading in");
    action.data = "";
    Base_Template(state , action, {content:"表单处理中", title:"", showBtn: false});
    return state;
};
const Save_FormError = (state , action) => {
    //console.log("Save_FormError in");
    state.active = false;
    if(Util.IsPC()){
       // Base_Template(state , action, {content:"", title:"提交失败", showBtn: true});
    }
    return state;
};
const Save_FormFileError = (state , action) => {
    //console.log("Save_FormFileError in");
    Base_Template(state , action, {content:"", title:"提交失败", showBtn: true});
    return state;
};


//发布模板
const Publish_TemplateSuccess = (state , action) => {
    //console.log("Publish_TemplateSuccess in");
    Base_Template(state , action, {content:"", title:"发布成功", showBtn: true});
    return state;
};
const Publish_TemplateLoading = (state , action) => {
    //console.log("Publish_TemplateLoading in");
    action.data = "";
    Base_Template(state , action, {content:"后台处理中", title:"", showBtn: false});
    return state;
};
const Publish_TemplateError = (state , action) => {
    //console.log("Publish_TemplateError in");
    Base_Template(state , action, {content:"", title:"发布失败", showBtn: true});
    return state;
};


const Save_TemplateError= (state , action) => {
    //console.log("Save_TemplateError in");
    Base_Template(state , action, {content:"", title:"保存失败", showBtn: true});
    return state;
};
const Cancel_Modal = (state , action) => {
    //console.log("Cancel_Modal in");
    state.active = false;
    state.showBtn = true;
    state.content =  "";
    state.title = "";
    //console.log("Cancel_Modal");
    return state;
};
//文件上传失败
const FileUpLoadError= (state , action) => {
    //console.log("FileUpLoadError in");
    state.active = true;
    state.showBtn = true;
    state.content =  "上传失败:" + action.content;
    state.title = "上传失败";
    //console.log("FileUpLoadError");
    return state;
};

const CancelFile_Modal= (state , action) => {
    //console.log("CancelFile_Modal in");
    state.active = true;
    state.formSuccess = true ;
    state.redirect = false ;
    state.content = "";
    return state;
};
module.exports = {
    Load_TemplateSuccess : Load_TemplateSuccess,
    Load_TemplateError : Load_TemplateError,
    Load_TemplateLoading: Load_TemplateLoading,
    Load_FormTemplateError: Load_TemplateError,
    Load_FormTemplateSuccess:Load_FormTemplateSuccess,

    Load_FormDataSuccess:Load_FormDataSuccess,
    Load_ShowFormDataSuccess:Load_ShowFormDataSuccess,

    Save_TemplateError:Save_TemplateError,

    Save_FormSuccess:Save_FormSuccess,
    Save_FormLoading:Save_FormLoading,
    Save_FormError:Save_FormError,
    Save_FormFileError:Save_FormFileError,

    Publish_TemplateSuccess:Publish_TemplateSuccess,
    Publish_TemplateLoading:Publish_TemplateLoading,
    Publish_TemplateError:Publish_TemplateError,

    Cancel_Modal:Cancel_Modal,
    CancelFile_Modal:CancelFile_Modal,
    FileUpLoadError:FileUpLoadError
};