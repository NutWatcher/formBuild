/**
 * Created by lyy on 2017/1/7.
 * 用于组合单选框属性列表中的行标签组件
 */
const  Copy_PropertyCheckListItem = (state , action) => {
    let insertOption = {};
    let options = [];
    console.log(action);
    state["list"].map((panel)=>{
        if (panel.select == true){
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    if(config["uId"] == "rowOptions"){
                        insertOption = config["options"][action.value];
                        config["options"].splice(action.value+1,0,insertOption);
                        config["options"] = JSON.parse(JSON.stringify(config["options"]));
                        options = config["options"];
                    }
                    console.log(config["options"]);
                });
            });
            panel.components.map((config)=>{
                if(config["rowOptions"]){
                    config["rowOptions"] = JSON.parse(JSON.stringify(options));
                    console.log("panel.components");
                    console.log(config["options"]);
                }
                config["value"].push( JSON.parse(JSON.stringify(config["value"][0])));
                config["rowOptions"].map((option, index)=>{
                    config["value"][index].name = option.name;
                });
            });
        }
    });
    return {...state}
};
const Delete_PropertyCheckListItem = (state , action) => {
    let insertOption = {};
    let options = [];
    console.log(action);
    state["list"].map((panel)=>{
        if (panel.select == true){
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    if(config["uId"] == "rowOptions"){
                        config["options"].splice(action.value,1);
                        config["options"] = JSON.parse(JSON.stringify(config["options"]));
                        options = config["options"];
                    }
                });
            });
            panel.components.map((config)=>{
                if(config["rowOptions"]){
                    config["rowOptions"] = JSON.parse(JSON.stringify(options));
                }
                config["value"].splice(0, 1);
                config["rowOptions"].map((option, index)=>{
                    config["value"][index].name = option.name;
                });
            });
        }
    });
    return {...state}
};
const Swap_PropertyCheckListItem = (state , action) => {
    console.log("change in");
    if (window.lyyState.Item["fly"] != true ){
        return state;
    }
    let liList = $('#PropertyMultipleCheckBoxList').find('li');
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
                    if(config["uId"] == "rowOptions"){
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
                if(config["rowOptions"]){
                    config["rowOptions"] = JSON.parse(JSON.stringify(options));
                }
                config["rowOptions"].map((option, index)=>{
                    config["value"][index].name = option.name;
                });
            });
        }
    });
    return {...state}
};
const Update_PropertyCheckListItem = (state , action) => {
    console.log("Update_ComPropertySelect");
    console.log(action);
    state["list"].map((panel)=>{
        if (panel.select == true){
            let options = [];
            panel.propertyComponents.map((propertyPanels)=>{
                propertyPanels.map((config)=>{
                    if(config["uId"] == action.uId){
                        config["options"][action.index].name = action.value;
                        config["options"][action.index].value = action.value;
                        options = config["options"];
                    }
                });
            });
            panel.components.map((config)=>{
                config["rowOptions"] = JSON.parse(JSON.stringify(options));
                config["rowOptions"].map((option, index)=>{
                    config["value"][index].name = option.name;
                });
            });
        }
    });
    console.log(state);
    return {...state};
};
module.exports = {
    Copy_PropertyCheckListItem : Copy_PropertyCheckListItem,
    Delete_PropertyCheckListItem: Delete_PropertyCheckListItem,
    Swap_PropertyCheckListItem:Swap_PropertyCheckListItem,
    Update_PropertyCheckListItem:Update_PropertyCheckListItem
};