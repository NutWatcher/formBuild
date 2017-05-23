/**
 * Created by lyy on 2017/1/2.
 */
import  * as http from  './http'
import * as validateComponent from '../actions/validate'
const Update_ComObject = (state , action) => {
  //  console.log("Update_ComObject");
 //   console.log(action);
    state["list"].map((panel)=>{
        panel.components.map((config)=>{
            if(config["uId"] == action.uId){
                if (config["type"] == "ComTimeBox"){
                    config[action.valueType] = action.value;
                    config.value = config["valueHour"] + ":" + config["valueMinute"];
                }
                else if (config["type"] == "ComTelephoneBox"){
                    if(config.showType == "手机"){
                        config.value = action.value;
                    }
                    else {
                        config.valueOption[action.index] = action.value;
                        config.value = config.valueOption[0] + "-" +
                            config.valueOption[1] + "-" + config.valueOption[2];
                    }
                }
                else if (config["type"] == "ComNameBox"){
                    config.valueOption[action.index] = action.value;
                    if(config.length == "普通"){
                        config.value = config.valueOption[0];
                    }
                    else {
                        config.value = config.valueOption[0] + "-" +
                            config.valueOption[1] + "-" + config.valueOption[2];
                    }
                }
                else if (config["type"] == "ComCheckBoxList"){
                    let values = [];
                    config["options"].map((option, index)=>{
                        if (option["name"] == action.matchKey){
                            option["checked"] = action.value;
                        }
                        if (option["checked"] == true){
                            values.push(option["name"]);
                        }
                    });
                    config.value = values;
                }
                else if (config["type"] == "ComRadioBoxList"){
                    let values = [];
                    if (action.param == "otherChecked"){
                        config.otherChecked = action["value"];
                        config.value = config.otherValue;
                        config["options"].map((option, index)=>{
                            option["checked"] = false;
                        });
                    }
                    else if (action.param == "otherValue"){
                        console.log(config);
                        config.otherValue = action["value"];
                        if (config.otherChecked == true){
                            config.value = config.otherValue;
                        }
                    }
                    else{
                        config.otherChecked = false;
                        config["options"].map((option, index)=>{
                            option["checked"] = false;
                            if (option["name"] == action.value.name){
                                option["checked"] = true;
                                config.value = option["name"];
                            }
                        });
                    }
                }
                else if (config["type"] == "ComMultipleCheckBox"){
              //      console.log(config);
                    config["value"][action.rowId]["checkedIndex"] = action.columnId;
                    config["value"][action.rowId]["value"] = config["options"][action.columnId].value;
                    config["value"] = JSON.parse(JSON.stringify(config["value"]));
                }
                else if (config["type"] == "ComMultipleSelectBox"){
                    config["configList"][action.index]["value"] = action.value;

                    //不是最后一个选择项，需要动态加载列表
                    if (action.index + 1 < config["selectNum"]) {
                        let deepIndex = 0;
                        let newOptions = [];
                        let newConfigList = [];
                        let flag = false;
                        //寻找下一级选项列表
                        function getChildren(children) {
                            children.map((child, index) => {

                                console.log(deepIndex);
                                console.log(action.index);
                                console.log(child.name);
                                console.log(config["configList"][deepIndex]["value"]);
                                console.log(child.name == config["configList"][deepIndex]["value"]);
                                if (flag == true) {
                                    return;
                                }
                                if (child.name == config["configList"][deepIndex]["value"]) {
                                    if (deepIndex == action.index) {
                                        newOptions = child["child"];
                                        flag = true;
                                    }
                                    else {
                                        deepIndex++;
                                        getChildren(child["child"]);
                                        deepIndex--;
                                    }
                                }
                            });
                        }

                        getChildren(config["optionsList"]["child"]);
                        console.log(newOptions);
                        for (let i = 0; i < action.index + 1; i++) {
                            newConfigList.push(config["configList"][i]);
                        }
                        let list = [" "];
                        newOptions.map((child) => {
                            list.push(child.name);
                        });
                        newConfigList.push({value: " ", options: list});

                        for (let i = action.index + 2; i < config["selectNum"]; i++) {
                            newConfigList.push({value: "", options: [" "]});
                        }

                        config["configList"] = [...newConfigList];
                    }
                    config["value"] = "";
                    for (let i = 0 ; i < config["selectNum"] ; i ++){
                        config["value"] += config["configList"][i]["value"] + ",";
                    }
                }
                else if (config["type"] == "ComShopBox"){
                    //商品增加、减少需要重新计算结算列表数据
                    config["options"].map((item, index)=>{
                        if (index == action.index){
                            console.log("item");
                            console.log(item);
                            item.value = item.value||0;
                            if (action.param == "add"){
                                console.log("add");
                                item.value += 1 ;
                            }
                            if (action.param == "sub"){
                                item.value -= 1 ;
                                if (item.value<0){item.value = 0 ;}
                            }
                            let value = item.value;
                            let shopName = item['shopName'];
                            let shopPrice = item['unitPrice'];
                            let shopUnit = item['unitName'];

                            let itemFlag = false ;
                            let shopFlag = false ;
                            //重新计算结算列表数量
                            state.checkState["shopList"].map((shops)=>{
                                if (shops.uId == config["uId"]){
                                    shops.items.map((item,index)=>{
                                        if (item.index == action.index){
                                            item.num = value;
                                            itemFlag = true ;
                                        }
                                    });
                                    if (itemFlag == false ){
                                        shops.items.push({name:shopName,index:index,
                                            num:value,price:shopPrice,unit:shopUnit});
                                        shops.items = [...shops.items];
                                    }
                                    shopFlag = true ;
                                }
                            });
                            if (shopFlag == false){
                                state.checkState["shopList"].push({name:config["label"],uId:config["uId"],
                                    items:[{name:shopName,index:index,
                                        num:value,price:shopPrice,unit:shopUnit}]});
                                state.checkState["shopList"] = [...state.checkState["shopList"]];
                            }
                            config.value = [];
                            state.checkState["shopList"].map((shops)=>{
                                //更新组件自身value
                                if (shops.uId == config["uId"]){
                                    shops.items.map((item,index)=>{
                                        config.value.push({
                                            index:index,
                                            num:item.num||0
                                        })
                                    });
                                }
                            })
                        }
                        let count = 0 ;
                        state.checkState["shopList"].map((shops)=>{
                            //console.log(shops);
                            shops.items.map((item)=>{
                                count += item["price"] * item["num"];
                            });
                        });
                        state.checkState["count"] = count ;
                        state.checkState["render"] ++ ;
                    })
                }
                else {
                    config["value"] = action.value;
                }
                if(validateComponent[config["type"]]){
                    validateComponent[config["type"]](config)
                }
            }
        });
    });
    console.log(state);
    return {...state};
};
const Update_ComAddress = (state , action) => {
    console.log("Update_ComAddress");
    //console.log(action);
    state["list"].map((panel)=>{
        panel.components.map((config)=>{
            if(config["uId"] == action.uId){
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
                config.value = config['provValue'] + config['cityValue'] + config['areaValue'] + config['address'];
            }
        });
    });
    return {...state};
};
export default  (state={
    pageState:{
        name:"头图",
        title:"页面标题",
        tip:"",
        description:"描述",
        mark:"",
        headImage:"",
        backgroundImage:""
    },
    list:[],
    ModalState:{active:false},
    checkState:{"shopList":[],"count":0,"render":0}
} , action) => {
    switch (action.type) {
        case "Load_TemplateError":
            return {...state, ModalState:http.Load_FormTemplateError(state.ModalState, action)};
        case "Load_TemplateSuccess":
            return http.Load_FormTemplateSuccess(state, action);
        case "Load_FormDataSuccess":
            console.log("Load_FormDataSuccess in");
            return {...state, ModalState:http.Load_ShowFormDataSuccess(state, action)};
        default:
            return state;
    }
}
