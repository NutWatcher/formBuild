/**
 * Created by lyy on 2017/1/7.
 */
const  Copy_PropertySelectItem = (state , action) => {
    let insertOption = {};
    let options = [];
    console.log(action);
    state["list"].map((panel)=>{
        if (panel.select == true){
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    if(config["uId"] == "settingOptions"){
                        insertOption = config["options"][action.value];
                        config["options"].splice(action.value+1,0,insertOption);
                        config["options"] = JSON.parse(JSON.stringify(config["options"]));
                        config["options"][action.value+1].checked = false;
                        options = config["options"];
                    }
                    console.log(config["options"]);
                });
            });
            panel.components.map((config)=>{
                if(config["options"]){
                    config["options"] = JSON.parse(JSON.stringify(options));
                    //console.log("panel.components");
                    //console.log(config["options"]);
                    if (config["type"] == "ComMultipleCheckBox"){
                        let checkIndex = -1 ;
                        let checkValue = "";
                        config.options.map((option, index)=>{
                            if (option.checked == true){
                                checkIndex = index;
                                checkValue = option.value;
                            }
                        });
                        config.value.map((option, index)=>{
                            option.value = checkValue;
                            option.checkedIndex = checkIndex;
                        })
                    }
                    //console.log(config);
                }
            });

        }
    });
    return {...state}
};
const  Delete_PropertySelectItem = (state , action) => {
    let insertOption = {};
    let options = [];
    console.log(action);
    state["list"].map((panel)=>{
        if (panel.select == true){
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    if(config["uId"] == "settingOptions"){
                        config["options"].splice(action.value,1);
                        config["options"] = JSON.parse(JSON.stringify(config["options"]));
                        options = config["options"];
                    }
                });
            });
            panel.components.map((config)=>{
                if(config["options"]){
                    config["options"] = JSON.parse(JSON.stringify(options));
                    if (config["type"] == "ComMultipleCheckBox"){
                        let checkIndex = -1 ;
                        let checkValue = "";
                        config.options.map((option, index)=>{
                            if (option.checked == true){
                                checkIndex = index;
                                checkValue = option.value;
                            }
                        });
                        config.value.map((option, index)=>{
                            option.value = checkValue;
                            option.checkedIndex = checkIndex;
                        })
                    }
                }
            });
        }
    });
    return {...state}
};
const Swap_PropertySelectListItem = (state , action) => {
    console.log("change in");
    if (window.lyyState.Item["fly"] != true ){
        return state;
    }
    let liList = $('#propertySelectBoxList').find('li');
    let insertIndex = 0 ;
    let insertOption = {};
    for (let i = 0 ; i < liList.length ; i++){
        if ($(liList[i]).hasClass('blank')){
            insertIndex = i;
        }
        if ($(liList[i]).hasClass('fly')){
            $(liList[i]).removeClass('fly');
            $(liList[i]).removeAttr("style");
        }
    }
    console.log(insertIndex);
    console.log(window.lyyState.Item["index"]);
    $(liList[insertIndex]).remove();
    let options = [];
    state["list"].map((panel, index)=>{
        if (panel.select == true){
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    if(config["uId"] == "settingOptions"){
                        insertOption = config["options"][window.lyyState.Item["index"]] ;
                        if (window.lyyState.Item["index"] < insertIndex){
                            config["options"].splice(insertIndex,0,insertOption);
                            config["options"].splice(window.lyyState.Item["index"],1);
                        }
                        else {
                            config["options"].splice(window.lyyState.Item["index"],1);
                            config["options"].splice(insertIndex,0,insertOption);
                        }
                        config["options"] = JSON.parse(JSON.stringify(config["options"]));
                        options =  config["options"];
                        console.log("finish");
                        console.log(config);
                    }
                });
            });
            panel.components.map((config)=>{
                if(config["options"]){
                    config["options"] = JSON.parse(JSON.stringify(options));
                    if (config["type"] == "ComMultipleCheckBox"){
                        let checkIndex = -1 ;
                        let checkValue = "";
                        config.options.map((option, index)=>{
                            if (option.checked == true){
                                checkIndex = index;
                                checkValue = option.value;
                            }
                        });
                        config.value.map((option, index)=>{
                            option.value = checkValue;
                            option.checkedIndex = checkIndex;
                        })
                    }
                }
            });
        }
    });
    return {...state}
};
const Update_PropertySelectList = (state , action) => {
    console.log("Update_ComPropertySelect");
    console.log(action);
    state["list"].map((panel)=>{
        if (panel.select == true){
            let options = [];
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    if(config["uId"] == action.uId){
                        if(action.params == "select_item"){
                            config["options"].map((item,index)=>{
                                item.select = false;
                                if (index == action.value){
                                    item.select = true;
                                }
                            })
                        }
                        else if(action.params == "checked") {
                            if (config["selectType"] == "radio"){
                                //单选框下，只能有一个值被选中
                                config["options"].map((item,index)=>{
                                    item[action.params] = false;
                                    if (index == action.index){
                                        item[action.params] = action.value;
                                    }
                                })
                            }
                            else{
                                config["options"].map((item,index)=>{
                                    if (index == action.index){
                                        item[action.params] = action.value;
                                    }
                                })
                            }
                        }
                        else if(action.params == "showTimes") {
                            config["options"].map((item,index)=>{
                                item[action.params] = false;
                                if (index == action.index){
                                    item[action.params] = action.value == false;
                                }
                            })
                        }
                        else if(action.params == "withImage") {
                            config["withImage"] = action.value ;
                        }
                        else if(action.params == "value") {
                            config["options"].map((item,index)=>{
                                if (index == action.index){
                                    item["name"] = action.value;
                                    item["value"] = action.value;
                                }
                            })
                        }
                        else{
                            config["options"].map((item,index)=>{
                                if (index == action.index){
                                    item[action.params] = action.value;
                                }
                            })
                        }
                        options = config["options"];
                    }
                });
            });
            panel.components.map((config)=>{
                if(config["options"]) {
                    config["options"] = JSON.parse(JSON.stringify(options));
                    if (action.params == "withImage") {
                        config["withImage"] = action.value;
                    }
                    else if (config["type"] == "ComMultipleCheckBox") {
                        let checkIndex = -1;
                        let checkValue = "";
                        config.options.map((option, index) => {
                            if (option.checked == true) {
                                checkIndex = index;
                                checkValue = option.value;
                            }
                        });
                        config.value.map((option, index) => {
                            option.value = checkValue;
                            option.checkedIndex = checkIndex;
                        })
                    }
                    else if (config["type"] == "ComSelectSingle") {
                        if (action.params == "checked" || action.params == "value") {
                            config["value"] = config["options"][action.index].value;
                        }
                    }
                    else if (config["type"] == "ComRadioBoxList") {
                        config.options.map((option, index) => {
                            if (option.checked == true) {
                                config["value"] = option.value;
                            }
                        });
                        /*if (action.params == "checked"|| action.params == "value") {
                            config["value"] = config["options"][action.index].value;
                        }*/
                    }
                    else if (config["type"] == "ComCheckBoxList") {
                        config["value"] = [];
                        config["options"].map((option)=>{
                            if (option.checked == true){
                                config["value"].push(option.value);
                            }
                        });
                    }
                }
            });
        }
    });
    console.log(state);
    return {...state};
};
module.exports = {
    Copy_PropertySelectItem : Copy_PropertySelectItem,
    Delete_PropertySelectItem: Delete_PropertySelectItem,
    Swap_PropertySelectListItem:Swap_PropertySelectListItem,
    Update_PropertySelectList:Update_PropertySelectList
};