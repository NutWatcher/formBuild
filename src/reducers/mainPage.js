/**
 *  主页面逻辑
 */
import MapConfig from '../formMap/index';
import {Copy_PropertySelectItem, Delete_PropertySelectItem,
    Swap_PropertySelectListItem, Update_PropertySelectList} from "./PropertySelect";
import {Copy_PropertyCheckListItem, Delete_PropertyCheckListItem,
    Swap_PropertyCheckListItem, Update_PropertyCheckListItem} from "./PropertyCheckList";
import {Load_TemplateSuccess} from "./http";
import * as ParseCom from "../actions/parse"
const changeMainPageSelect = (state , action) => {
    console.log("changeMainPageSelect Select_MainItem uId + " + action.uId);
    state.pageState.select = false ;
    state.eventList.dropNewItem = {
        drop:false
    };
    state.eventList.autoSelect = {
        select:false
    };
    if(action.uId == undefined){
        //console.log("undefined");
        return state;
    }
    if (window.lyyState.mainChange == true){
        window.lyyState.mainChange = false;
        return state;
    }
    state["list"].map((panel, index) => {
        if (panel["uId"] == action.uId){
            state["list"][index].select = true ;
            state["list"][index].panelClass = "focused";
        }
        else {
            state["list"][index].select = false ;
            state["list"][index].panelClass = "defaultBorder";
        }
    });
    //console.log(state);
    return { ...state};
};
const Select_PageState = (state , action) => {
    console.log("Select_PageState" );
    state.eventList.autoSelect = {
        select:false,
        pageState:false
    };
    if (window.lyyState.mainChange == true){
        window.lyyState.mainChange = false;
        return state;
    }
    /**
     * 主页面中控件样式恢复
     */
    state.pageState.select = true ;
    state["list"].map((panel, index) => {
        state["list"][index].select = false ;
        state["list"][index].panelClass = "defaultBorder";
    });
    return { ...state};
};
const MouseOver_MainItem = (state , action) => {
    //console.log("MouseOver_MainItem Select_MainItem uId + " + action.uId);
    if (  state["eventList"]["mouseMove"] ==  true ){
        return { ...state};
    }
    state["list"].map((panel, index) => {
        if (state["list"][index].select != true){
            if (panel["uId"] == action.uId ){
                state["list"][index].panelClass = "preFocus";
            }
            else {
                state["list"][index].panelClass = "defaultBorder";
            }
        }

    });
    return { ...state};
};
const Drop_MainItem = (state, action) =>{
    console.log("drop in");
    window.lyyState.startComponentDrag == false;
    let liList = $('#MainUl').find('li');
    let insertIndex = 0 ;
    for (let i = 0 ; i < liList.length ; i++){
        if ($(liList[i]).hasClass('tempBlankLi')){
            insertIndex = i;
        }
    }
    let newPanel = {
        select: false,
        /**
         * 深拷贝JSON.parse(JSON.stringify())
         */
        propertyComponents: JSON.parse(JSON.stringify(MapConfig[ window.lyyState.Item.text].propertyConfig)),
        components: JSON.parse(JSON.stringify([MapConfig[ window.lyyState.Item.text].config])),
        order: state["index"],
        uId: state["index"],
        panelClass:"defaultBorder",
        panelStyle:{},
        id:0,
        name:window.lyyState.Item.text,
        mark:""
    };
    newPanel["components"][0].name = state["index"];
    newPanel["components"][0].uId = state["index"];
    state["list"].splice(insertIndex,0,newPanel);
    state["list"] = [...state["list"]];
    state["index"]++;
    $('#MainUl').find('.tempBlankLi').remove();
    console.log(insertIndex);
    console.log(state["list"]);

    //默认选中
   /* state.pageState.select = false ;
    state["list"].map((panel, index) => {
        if (index == insertIndex){
            state["list"][index].select = true ;
            state["list"][index].panelClass = "focused";
        }
        else {
            state["list"][index].select = false ;
            state["list"][index].panelClass = "defaultBorder";
        }
    });*/
    state.eventList.autoSelect = {
        uId :newPanel.uId,
        newPanel:newPanel.propertyComponents,
        select:true
    };
    return {...state} ;
};
const Swap_MainPageItem  = (state, action) =>{
    console.log("Swap_MainPageItem in");
    window.lyyState.startChangeMainPageListItem == false;
    if (window.lyyState.Item["fly"] != true ){
        return state;
    }
    let insertIndex = 0 ;
    let removeIndex = 0 ;
    let liList = $('#MainUl').find('li');
    for (let i = 0 ; i < liList.length ; i++){
        if ($(liList[i]).hasClass('fly')){
            removeIndex = i ;
        }
        if ($(liList[i]).hasClass('tempBlankLi')){
            insertIndex = i;
        }
    }
//    console.log("fly " + removeIndex);
//    console.log("tempBlankLi " + insertIndex);
    $(liList[removeIndex]).removeAttr("style");
    $(liList[removeIndex]).removeClass("fly");
    $(liList[insertIndex]).remove();
    if (insertIndex + 1 == removeIndex){
        return state;
    }

    let tempPanel = {};
    if (insertIndex > removeIndex){
        let swapPanel = state["list"][removeIndex];
        tempPanel = swapPanel;
        state["list"].splice(insertIndex, 0, swapPanel);
        state["list"].splice(removeIndex,1);
    }
    else {
        let swapPanel = state["list"][removeIndex - 1];
        tempPanel = swapPanel;
        state["list"].splice(insertIndex, 0, swapPanel);
        state["list"].splice(removeIndex,1);
    }
    $('#moveWarp').addClass('hide');
//    console.log(insertIndex);
//    console.log(state["list"]);

    state.eventList.autoSelect = {
        uId :tempPanel.uId,
        newPanel:tempPanel.propertyComponents,
        select:true
    };


    return {...state,list:[...state["list"]]} ;
};
/**
 * 选中一个左侧控件，放进store中
 * @param state
 * @param action
 * @returns {{}}
 * @constructor
 */
const Select_ComponentPageItem = (state , action) => {
//    console.log("Select_ComponentPageItem");
//    console.log(action);
    let newPanel = {
        select: false,
        /**
         * 深拷贝JSON.parse(JSON.stringify())
         */
        propertyComponents: JSON.parse(JSON.stringify(MapConfig[action.componentType].propertyConfig)),
        components: JSON.parse(JSON.stringify([MapConfig[action.componentType].config])),
        order: state["index"],
        uId: state["index"],
        panelClass:"defaultBorder",
        panelStyle:{},
        id:0,
        name:action.componentType,
        mark:""
    };
    newPanel["components"][0].name = state["index"];
    newPanel["components"][0].uId = state["index"];
    state["list"] = [...state["list"],
        newPanel
    ];
    state["index"]++;
  //  console.log(state);
    return {...state};
};
/**
 * 设置完右侧控件属性，更新到store中
 * @param state
 * @param action
 * @returns {{}}
 * @constructor
 */
const Update_ComObject = (state , action) => {
    //console.log("Update_ComObject");
    console.log(action);
    state["list"].map((panel)=>{
        if (panel.select == true){
            let tempConfig = {};
            panel.components.map((config)=>{
                console.log(config["type"]);
                if (config["type"] == "ComSelectSingle"){
                    //修改选项频率
                    if (action.value.name == "times" || action.value.name == "cycle" ){
                        config["options"].map((option, index)=>{
                            if (index == action.value.value.index) {
                                option[action.value.name] = action.value.value.value;
                            }
                        });
                        config["options"] = JSON.parse(JSON.stringify( config["options"]));
                    }
                    //修改默认值
                    else if (action.value.name == "checked" ){
                        config["options"].map((option, index)=>{
                            if (index == action.value.value.index) {
                                config["value"] = option.value;
                            }
                        });
                        config["options"] = JSON.parse(JSON.stringify( config["options"]));
                    }
                        //修改选项值
                    else if (action.value.name == "updateOptionValue" ){
                        config["options"].map((option, index)=>{
                            if (index == action.value.value.index) {
                                if( config["value"] == option["value"]){
                                    config["value"] = action.value.value.value;
                                }
                                option["value"] = action.value.value.value;
                                option["name"] = action.value.value.value;
                            }
                        });
                        config["options"] = JSON.parse(JSON.stringify( config["options"]));
                    }
                    else if(config[action.uId] != null){
                        //console.log("Update_ComObject");
                        config[action.uId] = action.value;
                    }

                }
                else if (config["type"] == "ComMultipleCheckBox"){
                    if(action.uId == "settingOptions"){
                        config.value.map((option, index)=>{
                            option.checkedIndex = action.index;
                        })
                    }
                    else if(config[action.uId] != null){
                        config[action.uId] = action.value;
                    }
                    else if (action.param == 'checkBox'){
                        config[action.matchKey] = action.value;
                    }
                }
                else if (config["type"] == "ComTelephoneBox"){
                    if(action.uId == "value"){
                        if(config["showType"] == "座机"){
                            config.valueOption[action.index] = action.value;
                            config.value = config.valueOption[0] + "-" +
                                config.valueOption[1] + "-" + config.valueOption[2];
                        }
                        else{
                            config.value = action.value;
                        }
                    }
                    else if (action.uId == "showType"){
                        //修改属性列表默认值显示组件
                        config[action.uId] = action.value;
                        config["value"] = "";
                        config["valueOption"] = ["","",""];
                        panel.propertyComponents.map((propertyPanels, index)=> {
                            let flag = false;
                            propertyPanels.map((propertyConfig) => {
                                if(propertyConfig.uId == "value"){
                                    if(propertyConfig.type == "ComTextBox"){
                                        propertyConfig["propertyHide"] = action.value != "手机";
                                        propertyConfig["value"] = "";
                                    }
                                    else{
                                        propertyConfig["propertyHide"] = action.value != "座机";
                                        propertyConfig["value"] = "";
                                        propertyConfig["valueOption"] = ["","",""];
                                    }
                                    flag = true;
                                }
                            })
                            if(flag == true){
                                panel.propertyComponents[index] = JSON.parse(JSON.stringify(panel.propertyComponents[index]));
                            }
                        });
                        panel.propertyComponents = [...panel.propertyComponents];
                        state["propertyPageState"] = {
                            refresh:true,
                            propertyComponents:panel.propertyComponents
                        }
                        console.log("change");
                    }
                    else {
                        config[action.uId] = action.value;
                    }
                }
                else if (config["type"] == "ComAddressBox"){
                    tempConfig = config;
                    if (action.param == 'address'){
                        config['address'] = action.value;
                    }
                    else if (action.param == 'prov'){
                        if ( config['provValue'] == action.value ){
                            return state ;
                        }
                        config['provValue'] = action.value;
                        config['cityValue'] = "市";
                        config['areaValue'] = "区";
                        let cityList=[];
                        for(var i in window.formBuildState.address[ config['provValue']]){
                            cityList.push(i);
                        }
                        config['cityOptions'] = cityList;
                        config['areaOptions'] = [];
                    }
                    else if (action.param == 'city'){
                        if ( config['cityValue'] == action.value ){
                            return state ;
                        }
                        config['cityValue'] = action.value;
                        config['areaValue'] = "区";
                        let areaList=[];
                        config['areaOptions'] = window.formBuildState.address[config['provValue']][config['cityValue']];
                    }
                    else if (action.param == 'area'){
                        config['areaValue'] = action.value;
                    }
                    else{
                        config[action.uId] = action.value;
                    }
                    config.value = config['provValue'] + '¥' + config['cityValue'] + '¥' + config['areaValue'] + '¥' + config['address'];
                }
                else if (config["type"] == "ComTimeBox"){
                    config[action.uId] = action.value;
                    config.value = config["valueHour"] + ":" + config["valueMinute"];
          //          console.log(config.value);
                }
                else if (config["type"] == "ComMultipleSelectBox"){
                    if (action.uId == "selectNum"){
                        config["configList"] = [];
                        config[action.uId] = action.value;
                        config["value"] = [];
             //           console.log(parseInt(config["selectNum"]));
                        for (let i = 0 ; i < parseInt(config["selectNum"]) ; i ++ ){
                            config["configList"].push({value:' ',options:[' ']});
                            config["value"].push("");
                        }
                        ParseCom.Update_ComMultipleSelectBox(config);
             //           console.log(config["configList"]);
                    }
                    else if (action.uId == "label" || action.uId == "description"){
                        config[action.uId] = action.value;
                    }
                    else if (action.uId == "options"){
                        //间隔符号
                        action.value= action.value.replace(/￥￥/g,"");
                        config["options"]= action.value.replace(/\r\n/g,"￥￥");
                        config["options"]= config["options"].replace(/\n/g,"￥￥");
                        ParseCom.Update_ComMultipleSelectBox(config);
                    }
                }
                else if (action.param == 'checkBox'){
                    config[action.matchKey] = action.value;
                }
                else if (config["type"] == "ComImageBox"){
                    if (action.uId == "src" && action.value == ""){
                        config[action.uId] = window.formBuildState.ImageLocation + "/imageDefault.png";
                    }
                    else if(config[action.uId] != null){
                        config[action.uId] = action.value;
                    }

                }
                else if(config[action.uId] != null){
             //       console.log("Update_ComObject");
                    config[action.uId] = action.value;
              //      console.log(config);
                }
                if (action.param == 'checkBox'){
                    config[action.matchKey] = action.value;
                    if (config["type"] == "ComRadioBoxList" && action.matchKey == 'other'){
                        panel.propertyComponents.map((propertyPanels)=>{
                            propertyPanels.map((config)=>{
                                if(config["type"] == "ComPropertySelectBox"){
                                    config["showOtherOption"] = action.value ;
                                }
                            });
                        });
                    }
                }
            });
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    if(config["uId"] == action.uId){
                        console.log(config["type"]);
                        if(config["type"] == "ComCheckBoxList"){
                            config["options"].map((option)=>{
                                if (option["matchKey"] == action.matchKey){
                                    option["checked"] = action.value;
                                }
                            });
                        }
                        else if(config["type"] == "ComAddressBox"){
                            console.log(tempConfig);
                            config['provValue'] = tempConfig['provValue'];
                            config['cityValue'] = tempConfig['cityValue'];
                            config['cityOptions'] = tempConfig['cityOptions'];
                            config['areaValue'] = tempConfig['areaValue'];
                            config['areaOptions'] = tempConfig['areaOptions'];
                            config['address'] = tempConfig['address'];
                        }
                        else if(config["type"] == "ComPropertySelectBox"){
                            //console.log(action.value.value.index);
                            //console.log(action.value.name);
                            config["options"].map((option, index)=>{
                                if (action.value.name == "times" ||
                                    action.value.name == "cycle" 
                                ){
                                    if (index == action.value.value.index){
                                        option[action.value.name] =  action.value.value.value;
                                    }
                                }
                                else if (action.value.name == "checked"){
                                    //console.log(index == action.value.value.index);
                                    option["checked"] = index == action.value.value.index;
                                }
                                else if (action.value.name == "showTimes"){
                                    if (index == action.value.value.index){
                                        option["showTimes"] =  option["showTimes"]==false ;
                                    }
                                }
                                else if (action.value.name == "updateOptionValue"){
                                    if (index == action.value.value.index){
                                        option["name"] =  action.value.value.value;
                                        option["value"] =  action.value.value.value;
                                    }
                                }
                            });
                        }
                        else if (config["type"] == "ComTelephoneBox"){
                            config.valueOption[action.index] = action.value;
                            config.value = config.valueOption[0] + "-" +
                                config.valueOption[1] + "-" + config.valueOption[2];
                        }
                        else{
                            config["value"] = action.value;
                        }

                    }
                });
            });
        }
    });
   // console.log(state);
    return {...state};
};
const Update_RadioOtherOptionImage = (state , action) => {
    console.log("Update_RadioOtherOptionImage");
    console.log(action);
    state["list"].map((panel)=>{
        if (panel.select == true){
            let options = [];
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    config["showOtherOptionImage"] = action.value;
                });
            });
            panel.components.map((config)=>{
                if(config["options"]) {
                    config["otherImage"] = action.value;
                }
            });
        }
    });
    console.log(state);
    return {...state};
};
const Update_HeadPage = (state , action) => {
    console.log("Update_HeadPage");
    for ( let key in state.pageState["config"])
    {
        if (key == action.uId){
            state.pageState["config"][key] = action.value;
        }
    }
    state.pageState["propertyConfig"].map((panel,index)=>{
        panel.map((item, index)=>{
            if (item.uId == action.uId){
                item["value"] = action.value;
            }
        })
    });
    console.log(state);
    return {...state};
};
/**
 * 删除主页面控件
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
const Delete_MainItem = (state , action) => {
    //console.log("Copy_MainItem uId + " + action.uId);
    if(action.uId == undefined){
        //console.log("undefined");
        return state;
    }
    let tempIndex = 0 ;
    state["list"].map((panel, index) => {
        if (panel["uId"] == action.uId){
            tempIndex = index;
        }
    });
    state["list"].splice(tempIndex,1);
    state.eventList.autoSelect = {
        select:true,
        pageState:true
    };
    //console.log(state);
    return {...state, list:[...state["list"]]};
};
/**
 * 复制主页面控件
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
const Copy_MainItem = (state , action) => {

    if(action.uId == undefined){
        return state;
    }
    console.log("Copy_MainItem");
    console.log(action);
    let tempIndex = 0 ;
    state["list"].map((panel, index) => {
        if (panel["uId"] == action.uId){
            tempIndex = index;
        }
    });
    /**
     * 深拷贝JSON.parse(JSON.stringify())
     */
    let newPanel = JSON.parse(JSON.stringify(state["list"][tempIndex]));
    newPanel = {
        ...newPanel,
        select: false,
        order: state["index"],
        uId: state["index"],
        id:0
    };
    newPanel["components"][0].name = state["index"];
    newPanel["components"][0].uId = state["index"];
    state["list"].splice(tempIndex+1,0,newPanel);
    state["index"]++;
    //console.log(state);
    return {...state, list:[...state["list"]]};
};
const Update_ComShop = (state , action) => {
    console.log("Update_ComShop");
    console.log(action);
    state["list"].map((panel)=>{
        if (panel.select == true){
            let options = [];
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    if(config["uId"] == action.uId){
                        if(action.params == "select_item"){
                            config["shopList"].map((shop,index)=>{
                                shop.select = false;
                                if (index == action.value){
                                    shop.select = true;
                                }
                            })
                        }
                        else if(action.params == "withImage") {
                            config["withImage"] = action.value ;
                        }
                        else if(action.params == "copy") {
                            let tempIndex = 0;
                            config["shopList"].map((shop,index)=>{
                                shop.select = false;
                                if (index == action.index){
                                    tempIndex = index ;
                                }
                            });
                            config["shopList"].splice(tempIndex,0,config["shopList"][tempIndex]);
                            config["shopList"] = JSON.parse(JSON.stringify(config["shopList"]));
                        }
                        else if(action.params == "delete") {
                            let tempIndex = 0;
                            config["shopList"].map((shop,index)=>{
                                shop.select = false;
                                if (index == action.index){
                                    tempIndex = index ;
                                }
                            });
                            config["shopList"].splice(tempIndex,1);
                            config["shopList"] = JSON.parse(JSON.stringify(config["shopList"]));
                        }
                        else{
                            config["shopList"].map((shop,index)=>{
                                if (index == action.index){
                                    shop[action.params] = action.value;
                                }
                            })
                        }
                        options = config["shopList"];
                    }
                });
            });
            panel.components.map((config)=>{
                if (config["type"] == "ComShopBox"){
                    if (action.params == "withImage"){
                        config["withImage"] = action.value ;
                    }
                    else {
                        config["options"] = JSON.parse(JSON.stringify(options));
                    }
                }
            });
        }
    });
    console.log(state);
    return {...state};
};

export default  (state={
    eventList:{mouseMove:false,mouseUp:false,dropNewItem:{drop:false},autoSelect:{select:false}},
    template:{
        id:0,
        version:"0.1",
        mark:"mark"
    },
    propertyPageState:{refresh:false},
    pageState:JSON.parse(JSON.stringify(MapConfig["头图"])),
    list:[],
    index:1 //设置组件ID唯一值，用于前端标识，不是后端数据库key。
} , action) => {
    switch (action.type) {
        case "Update_ComObject":
            //更新组件属性信息
            state["pageState"]["pageChange"] = true;
            if (state.pageState.select == true){
                //选中头图
                return Update_HeadPage(state, action);
            }
            else if (action.com == 'ComShopPropertyBox'){
                return Update_ComShop(state, action);
            }
            else{
                return Update_ComObject(state, action);
            }
        case "Update_RadioOtherOptionSelectImage":
            return Update_RadioOtherOptionImage(state, action);
        case "Select_ComponentPageItem":
            //点击左侧增加控件
            state["pageState"]["pageChange"] = true;
            return Select_ComponentPageItem(state, action);

        /**
         * 主界面交互事件
         */
        case "Select_MainItem":
            //点击主页面控件
            return changeMainPageSelect(state, action);
        case "Select_PageState":
            //点击主页面头图
            return Select_PageState(state, action);
        case "MouseOver_MainItem":
            return MouseOver_MainItem(state, action);
        case "Swap_MainPageItem":
            state["pageState"]["pageChange"] = true;
            return Swap_MainPageItem(state, action);
        case "Drop_MainItem":
            state["pageState"]["pageChange"] = true;
            return Drop_MainItem(state, action);
        case "Copy_MainItem":
            state["pageState"]["pageChange"] = true;
            return Copy_MainItem(state, action);
        case "Delete_MainItem":
            state["pageState"]["pageChange"] = true;
            return Delete_MainItem(state, action);

        /**
         * 属性列表中PropertySelectBox事件
         */
        case "Update_PropertySelectList":
            //修改
            state["pageState"]["pageChange"] = true;
            return Update_PropertySelectList(state, action);
        case "Swap_PropertySelectListItem":
            //交换位置
            state["pageState"]["pageChange"] = true;
            return Swap_PropertySelectListItem(state, action);
        case "Copy_PropertySelectItem":
            //复制
            state["pageState"]["pageChange"] = true;
            return Copy_PropertySelectItem(state, action);
        case "Delete_PropertySelectItem":
            //删除
            state["pageState"]["pageChange"] = true;
            return Delete_PropertySelectItem(state, action);
        /**
         * 属性列表中PropertySelectBox事件结束
         */

        /**
         * 属性列表中PropertyCheckListBox事件
         */
        case "Update_PropertyCheckListItem":
            //修改
            state["pageState"]["pageChange"] = true;
            return Update_PropertyCheckListItem(state, action);
        case "Swap_PropertyCheckListItem":
            //交换位置
            state["pageState"]["pageChange"] = true;
            return Swap_PropertyCheckListItem(state, action);
        case "Copy_PropertyCheckListItem":
            //复制
            state["pageState"]["pageChange"] = true;
            return Copy_PropertyCheckListItem(state, action);
        case "Delete_PropertyCheckListItem":
            //删除
            state["pageState"]["pageChange"] = true;
            return Delete_PropertyCheckListItem(state, action);
        /**
         * 属性列表中PropertySelectBox事件结束
         */

        /**
         * 加载服务端模板信息成功
         */
        case "Load_TemplateSuccess":
            return Load_TemplateSuccess(state, action);

        case "Render_PropertyPage":
            state["propertyPageState"]["refresh"] = false;
            return {...state};
        default:
            return state;
    }
}

