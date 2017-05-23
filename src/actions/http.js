/**
 * Created by lyy on 2017/1/8.
 */
import * as validateComponent from './validate'

let sampleFormData = {"templateId":123456,"version":111,"hidden":"-1","component":[{"id":1,"value":"text value"},{"id":2,"value":["选项2"]},{"id":3,"value":"2017-05-16"},{"id":4,"value":[{"name":"flower","url":"http://ww4.sinaimg.cn/bmiddle/6267fbbegy1ffnl7jgyspj20p00gqq94.jpg"},{"name":"rabbit","url":"http://ww4.sinaimg.cn/bmiddle/750974b3gy1ffnmcy0ly8j21w02io4qp.jpg"}]},{"id":5,"value":"here is mutiple text value."},{"id":6,"value":"[{\"index\":0,\"num\":1},{\"index\":1,\"num\":2},{\"index\":2,\"num\":1}]"}]};
let sampleData = {"id":123456,"title":"Sample Form 演示文档","description":"Some functions such as file upload can not be enabled,because it is a static page. 由于是静态页面，所以文件上传等一些功能无法启用。","version":111,"hidden":"-1","mark":"mark","property":"{\"select\":false,\"config\":{\"name\":\"头图\",\"title\":\"Sample Form 演示文档\",\"description\":\"Some functions such as file upload can not be enabled,because it is a static page. 由于是静态页面，所以文件上传等一些功能无法启用。\",\"mark\":\"\",\"headImage\":\"\",\"backgroundImage\":\"\",\"id\":0},\"propertyConfig\":[[{\"type\":\"ComTextBox\",\"label\":\"页面标题\",\"uId\":\"title\",\"value\":\"Sample Form 演示文档\",\"tip\":\"输入页面标题\"}],[{\"type\":\"ComTextBox\",\"label\":\"描述\",\"uId\":\"description\",\"value\":\"Some functions such as file upload can not be enabled,because it is a static page. 由于是静态页面，所以文件上传等一些功能无法启用。\",\"tip\":\"输入描述\"}],[{\"type\":\"ComPropertyFileUploadBox\",\"dispatchSrc\":true,\"picker\":\"ComFileUploadBox_headImage\",\"label\":\"头图\",\"uId\":\"headImage\",\"value\":\"\",\"tip\":\"表单上方图片\",\"autoUpload\":true,\"accept\":\"image\"}],[{\"type\":\"ComPropertyFileUploadBox\",\"dispatchSrc\":true,\"picker\":\"ComFileUploadBox_backgroundImage\",\"label\":\"背景图\",\"uId\":\"backgroundImage\",\"value\":\"\",\"tip\":\"表单背景图\",\"autoUpload\":true,\"accept\":\"image\"}]],\"pageChange\":true}","component":[{"id":1,"type":"ComTextBox","name":"单行文本","mark":"","property":"{\"select\":false,\"propertyComponents\":[[{\"type\":\"ComTextAreaBox\",\"label\":\"字段名称\",\"uId\":\"label\",\"value\":\"单行文本\"}],[{\"type\":\"ComCheckBoxList\",\"label\":\"设置\",\"uId\":\"settingCheckbox\",\"tip\":\"\",\"options\":[{\"name\":\"必须输入\",\"matchKey\":\"require\",\"uId\":\"require\",\"tip\":\"用户必须输入此字段，否则将不能提交表单。\",\"checked\":false},{\"name\":\"隐藏\",\"matchKey\":\"hidden\",\"uId\":\"require\",\"tip\":\"\",\"checked\":false}]},{\"type\":\"ComSelectSingle\",\"uId\":\"length\",\"length\":\"xxl\",\"label\":\"字段长度\",\"value\":\"m\",\"options\":[{\"name\":\"短\",\"value\":\"s\"},{\"name\":\"中\",\"value\":\"m\"},{\"name\":\"长\",\"value\":\"xxl\"}]}],[{\"type\":\"ComTextBox\",\"label\":\"默认值\",\"uId\":\"value\",\"value\":\"\",\"length\":\"xxl\",\"tip\":\"在用户访问表单时，此值将作为默认值显示在输入框中。如果不需要默认值，请将此处设置为空。\"}],[{\"type\":\"ComNumberBox\",\"label\":\"最小长度\",\"uId\":\"min\",\"length\":\"l\",\"value\":\"\",\"tip\":\"数值型字段用于限定字符的长度\"},{\"type\":\"ComNumberBox\",\"label\":\"最大长度\",\"uId\":\"max\",\"length\":\"l\",\"value\":\"\",\"tip\":\"数值型字段用于限定字符的长度\"}],[{\"type\":\"ComTextAreaBox\",\"label\":\"字段说明\",\"uId\":\"description\",\"height\":\"s\",\"tip\":\"对字段进行解释，帮助填表人进行理解和输入。\",\"value\":\"\"}]],\"components\":[{\"type\":\"ComTextBox\",\"label\":\"单行文本\",\"length\":\"m\",\"max\":\"\",\"min\":\"\",\"value\":\"\",\"description\":\"\",\"submit\":true,\"require\":false,\"hidden\":false,\"name\":1,\"uId\":1}],\"order\":0,\"uId\":1,\"panelClass\":\"defaultBorder\",\"panelStyle\":{},\"id\":0,\"name\":\"单行文本\",\"mark\":\"\"}"},{"id":2,"type":"ComCheckBoxList","name":"多选框","mark":"","property":"{\"select\":false,\"propertyComponents\":[[{\"type\":\"ComTextAreaBox\",\"label\":\"字段名称\",\"uId\":\"label\",\"value\":\"多选框\"}],[{\"type\":\"ComCheckBoxList\",\"label\":\"设置\",\"uId\":\"settingCheckbox\",\"tip\":\"\",\"options\":[{\"name\":\"必须输入\",\"matchKey\":\"require\",\"uId\":\"require\",\"tip\":\"用户必须输入此字段，否则将不能提交表单。\",\"checked\":false}]},{\"type\":\"ComSelectSingle\",\"uId\":\"length\",\"length\":\"xxl\",\"label\":\"布局\",\"value\":\"l\",\"options\":[{\"name\":\"一列\",\"value\":\"l\"},{\"name\":\"两列\",\"value\":\"m\"},{\"name\":\"三列\",\"value\":\"s\"},{\"name\":\"自动排列\",\"value\":\"auto\"}]}],[{\"type\":\"ComPropertySelectBox\",\"label\":\"选择项\",\"uId\":\"settingOptions\",\"selectType\":\"checkbox\",\"needCheckBox\":true,\"withImage\":false,\"tip\":\"此属性用于指定有哪些选择项可以提供给用户选择。利用旁边的增加或删除按钮以增加或删除选择项。对于下拉框在没有指定默认选中项的情况下将自动选中第一项。\",\"options\":[{\"times\":0,\"cycle\":\"每天\",\"showTimes\":false,\"name\":\"选项1\",\"value\":\"选项1\",\"checked\":false,\"src\":\"/public/base/image/blank.png\"},{\"times\":0,\"cycle\":\"每天\",\"showTimes\":false,\"name\":\"选项2\",\"value\":\"选项2\",\"checked\":true,\"src\":\"/public/base/image/blank.png\"},{\"times\":0,\"cycle\":\"每天\",\"showTimes\":false,\"name\":\"选项3\",\"value\":\"选项3\",\"checked\":false,\"src\":\"/public/base/image/blank.png\"}]}],[{\"type\":\"ComNumberBox\",\"label\":\"最少选择几项\",\"uId\":\"min\",\"length\":\"l\",\"value\":\"\",\"tip\":\"数值型字段用于限定选择数量\"},{\"type\":\"ComNumberBox\",\"label\":\"最多选择几项\",\"uId\":\"max\",\"length\":\"l\",\"value\":\"\",\"tip\":\"数值型字段用于限定选择数量\"}],[{\"type\":\"ComTextAreaBox\",\"label\":\"字段说明\",\"uId\":\"description\",\"height\":\"l\",\"tip\":\"对字段进行解释，帮助填表人进行理解和输入。\",\"value\":\"\"}]],\"components\":[{\"type\":\"ComCheckBoxList\",\"label\":\"多选框\",\"tip\":\"\",\"description\":\"\",\"min\":\"\",\"max\":\"\",\"length\":\"l\",\"value\":[\"选项2\"],\"submit\":true,\"require\":false,\"withImage\":false,\"options\":[{\"times\":0,\"cycle\":\"每天\",\"showTimes\":false,\"name\":\"选项1\",\"value\":\"选项1\",\"checked\":false,\"src\":\"/public/base/image/blank.png\"},{\"times\":0,\"cycle\":\"每天\",\"showTimes\":false,\"name\":\"选项2\",\"value\":\"选项2\",\"checked\":true,\"src\":\"/public/base/image/blank.png\"},{\"times\":0,\"cycle\":\"每天\",\"showTimes\":false,\"name\":\"选项3\",\"value\":\"选项3\",\"checked\":false,\"src\":\"/public/base/image/blank.png\"}],\"name\":3,\"uId\":3}],\"order\":1,\"uId\":3,\"panelClass\":\"defaultBorder\",\"panelStyle\":{},\"id\":0,\"name\":\"多选框\",\"mark\":\"\"}"},{"id":3,"type":"ComDatePickerBox","name":"日期","mark":"","property":"{\"select\":false,\"propertyComponents\":[[{\"type\":\"ComTextBox\",\"label\":\"字段名称\",\"uId\":\"label\",\"value\":\"日期\"}],[{\"type\":\"ComTextBox\",\"label\":\"默认值\",\"uId\":\"value\",\"length\":\"xxl\",\"tip\":\"在用户访问表单时，此值将作为默认值显示在输入框中“YYYY-MM-DD”格式的固定日期，不填则默认为当天。\",\"value\":\"\"}],[{\"type\":\"ComSelectSingle\",\"uId\":\"dataStyle\",\"length\":\"xxl\",\"label\":\"日期格式\",\"value\":\"dataStyle\",\"options\":[{\"name\":\"YYYY-MM-DD\",\"value\":\"YYYY-MM-DD\"},{\"name\":\"DD/MM/YYYY\",\"value\":\"DD/MM/YYYY\"},{\"name\":\"MM/DD/YYYY\",\"value\":\"MM/DD/YYYY\"}]}],[{\"type\":\"ComTextAreaBox\",\"label\":\"字段说明\",\"uId\":\"description\",\"value\":\"\"}]],\"components\":[{\"type\":\"ComDatePickerBox\",\"label\":\"日期\",\"length\":\"m\",\"value\":\"2017-05-16\",\"description\":\"\",\"dataStyle\":\"YYYY-MM-DD\",\"submit\":true,\"name\":5,\"uId\":5}],\"order\":2,\"uId\":5,\"panelClass\":\"defaultBorder\",\"panelStyle\":{},\"id\":0,\"name\":\"日期\",\"mark\":\"\"}"},{"id":4,"type":"ComFileUploadBox","name":"文件上传","mark":"","property":"{\"select\":true,\"propertyComponents\":[[{\"type\":\"ComTextAreaBox\",\"label\":\"字段名称\",\"uId\":\"label\",\"value\":\"文件上传(jpg,png)\"}],[{\"type\":\"ComNumberBox\",\"label\":\"文件上传大小/M\",\"tip\":\"上传的文件只能小于此处设置的文件大小\",\"uId\":\"fileSingleSizeLimit\",\"value\":\"2\"}],[{\"type\":\"ComTextAreaBox\",\"label\":\"文件上传格式(文件格式以英文逗号[,]分隔)\",\"uId\":\"fileType\",\"value\":\"jpg,png\"}],[{\"type\":\"ComCheckBoxList\",\"label\":\"设置\",\"uId\":\"settingCheckbox\",\"tip\":\"\",\"options\":[{\"name\":\"必须输入\",\"matchKey\":\"require\",\"uId\":\"require\",\"tip\":\"用户必须输入此字段，否则将不能提交表单。\",\"checked\":false}]}],[{\"type\":\"ComTextAreaBox\",\"label\":\"字段说明\",\"uId\":\"description\",\"height\":\"l\",\"tip\":\"对字段进行解释，帮助填表人进行理解和输入。\",\"value\":\"\"}]],\"components\":[{\"type\":\"ComFileUploadBox\",\"label\":\"文件上传(jpg,png)\",\"value\":[],\"fileSingleSizeLimit\":\"2\",\"fileType\":\"jpg,png\",\"description\":\"\",\"submit\":true,\"require\":false,\"date\":\"\",\"dispatchSrc\":false,\"name\":6,\"uId\":6}],\"order\":3,\"uId\":6,\"panelClass\":\"focused\",\"panelStyle\":{},\"id\":0,\"name\":\"文件上传\",\"mark\":\"\"}"},{"id":5,"type":"ComTextAreaBox","name":"多行文本","mark":"","property":"{\"select\":false,\"propertyComponents\":[[{\"type\":\"ComTextAreaBox\",\"label\":\"字段名称\",\"uId\":\"label\",\"value\":\"多行文本\"}],[{\"type\":\"ComCheckBoxList\",\"label\":\"设置\",\"uId\":\"settingCheckbox\",\"tip\":\"\",\"options\":[{\"name\":\"必须输入\",\"matchKey\":\"require\",\"uId\":\"require\",\"tip\":\"用户必须输入此字段，否则将不能提交表单。\",\"checked\":false}]},{\"type\":\"ComSelectSingle\",\"uId\":\"height\",\"length\":\"xxl\",\"label\":\"字段长度\",\"value\":\"m\",\"options\":[{\"name\":\"短\",\"value\":\"s\"},{\"name\":\"中\",\"value\":\"m\"},{\"name\":\"长\",\"value\":\"l\"}]}],[{\"type\":\"ComTextBox\",\"label\":\"默认值\",\"uId\":\"value\",\"value\":\"\",\"length\":\"xxl\",\"tip\":\"在用户访问表单时，此值将作为默认值显示在输入框中。如果不需要默认值，请将此处设置为空。\"}],[{\"type\":\"ComNumberBox\",\"label\":\"最小长度\",\"uId\":\"min\",\"length\":\"l\",\"value\":\"\",\"tip\":\"数值型字段用于限定字符的长度\"},{\"type\":\"ComNumberBox\",\"label\":\"最大长度\",\"uId\":\"max\",\"length\":\"l\",\"value\":\"\",\"tip\":\"数值型字段用于限定字符的长度\"}],[{\"type\":\"ComTextAreaBox\",\"label\":\"字段说明\",\"uId\":\"description\",\"height\":\"l\",\"tip\":\"对字段进行解释，帮助填表人进行理解和输入。\",\"value\":\"\"}]],\"components\":[{\"type\":\"ComTextAreaBox\",\"label\":\"多行文本\",\"height\":\"m\",\"max\":\"\",\"min\":\"\",\"value\":\"\",\"description\":\"\",\"submit\":true,\"require\":false,\"name\":7,\"uId\":7}],\"order\":4,\"uId\":7,\"panelClass\":\"defaultBorder\",\"panelStyle\":{},\"id\":0,\"name\":\"多行文本\",\"mark\":\"\"}"},{"id":6,"type":"ComShopBox","name":"无图商品","mark":"","property":"{\"select\":false,\"propertyComponents\":[[{\"type\":\"ComShopPropertyBox\",\"tip\":\"213\",\"label\":\"商品列表\",\"uId\":\"ShopPropertyBox\",\"withImage\":false,\"shopList\":[{\"shopName\":\"商品1\",\"unitPrice\":3,\"unitName\":\"袋\",\"description\":\"\",\"select\":false,\"currency\":\"￥\",\"rate\":1,\"src\":\"/public/base/image/blank.png\"},{\"shopName\":\"商品2\",\"unitPrice\":3,\"unitName\":\"袋\",\"description\":\"\",\"select\":false,\"currency\":\"￥\",\"rate\":1,\"src\":\"/public/base/image/blank.png\"},{\"shopName\":\"商品3\",\"unitPrice\":3,\"unitName\":\"袋\",\"description\":\"\",\"select\":false,\"currency\":\"￥\",\"rate\":1,\"src\":\"/public/base/image/blank.png\"}]}],[{\"type\":\"ComTextAreaBox\",\"label\":\"字段名称\",\"uId\":\"label\",\"value\":\"商品\"}],[{\"type\":\"ComCheckBoxList\",\"label\":\"设置\",\"uId\":\"settingCheckbox\",\"tip\":\"\",\"options\":[{\"name\":\"必须输入\",\"matchKey\":\"require\",\"uId\":\"require\",\"tip\":\"用户必须输入此字段，否则将不能提交表单。\",\"checked\":false}]}],[{\"type\":\"ComTextAreaBox\",\"label\":\"字段说明\",\"uId\":\"description\",\"height\":\"l\",\"tip\":\"对字段进行解释，帮助填表人进行理解和输入。\",\"value\":\"\"}]],\"components\":[{\"type\":\"ComShopBox\",\"label\":\"商品\",\"value\":[],\"description\":\"\",\"submit\":true,\"require\":false,\"withImage\":false,\"options\":[{\"value\":0,\"shopName\":\"商品1\",\"unitPrice\":3,\"unitName\":\"袋\",\"description\":\"\",\"currency\":\"￥\",\"rate\":1,\"src\":\"/public/base/image/blank.png\"},{\"value\":0,\"shopName\":\"商品2\",\"unitPrice\":3,\"unitName\":\"袋\",\"description\":\"\",\"currency\":\"￥\",\"rate\":1,\"src\":\"/public/base/image/blank.png\"},{\"value\":0,\"shopName\":\"商品3\",\"unitPrice\":3,\"unitName\":\"袋\",\"description\":\"\",\"currency\":\"￥\",\"rate\":1,\"src\":\"/public/base/image/blank.png\"}],\"name\":8,\"uId\":8}],\"order\":5,\"uId\":8,\"panelClass\":\"preFocus\",\"panelStyle\":{},\"id\":0,\"name\":\"无图商品\",\"mark\":\"\"}"}]};
const validate = (state) => {
    let flag = true;
    state["list"].map((panel, index) => {
        if (panel.type != 'blank') {
            panel.components.map((component) => {
                component.validated = "";
                if (component.submit == true) {
                    if (component.require == true) {
                        if (component.type == "ComFileUploadBox"){

                        }
                        else if (component.value.toString().trim() == "") {
                            console.log(index + " validate error");
                            console.log(component.value);
                            component.validated = "该字段不允许为空，请输入数据。";
                            flag = false;
                        }
                    }
                    //特殊组件验证
                    //      console.log(component);
                    //   console.log(component.type);
                    if (validateComponent[component.type]) {
                        console.log(component.type);
                        flag = validateComponent[component.type](component) && flag;
                    }
                }
            });
        }
    });
    return flag;
};
const baseSaveTemplate = (dispatch, getState, dispatchState) =>{
    const {MainState}  = getState();
    if (MainState["pageState"]["pageChange"] != true) {
        //console.log("no change");
        if(dispatchState == "preview"){
            var tempWindow = window.open();
            tempWindow.location = window.formBuildState.TemplatePreviewUrl + "/" + $PageProfile.id;
            dispatch({
                type: 'Go_PreviewPage'
            });
            return;
        }
    }
    dispatch({
        type: 'Save_TemplateLoading'
    });
    let componentList = [];
    MainState["pageState"]["config"].id = MainState["pageState"]["config"].id || 0;
    MainState["list"].map((panel, index) => {
        if (panel.type != 'blank') {
            panel.order = index;
            let property = JSON.stringify(panel);  //.replace(/\\/g,"\\\\");
            componentList.push({
                id: panel.id,
                type: panel.components[0].type,
                name: panel.name,
                mark: panel.mark,
                property: property
            });
        }
    });
    let data = {
        id: MainState.template.id,
        title: MainState["pageState"]["config"].title,
        description: MainState["pageState"]["config"].description,
        version: MainState.template.version,
        hidden:MainState.template.hidden,
        mark: MainState.template.mark,
        property: JSON.stringify(MainState["pageState"]), //.replace(/\\/g,"\\\\"),
        component: componentList
    };
    // console.log(data);
    if(dispatchState == "preview"){
        var tempWindow = window.open();
    }
    console.log(JSON.stringify(data));
    $.ajax({
        url: window.formBuildState["TemplateUpdateUrl"] + "/" + $PageProfile["id"],
        contentType: "application/json",
        method: "put",
        data: JSON.stringify(data),
        success(res){
            if (res.res == 1) {
                console.log("dispatchState " + dispatchState);
                if(dispatchState == "preview"){
                    tempWindow.location = window.formBuildState.TemplatePreviewUrl + "/" + $PageProfile["id"];
                    dispatch({
                        type: 'Go_PreviewPage'
                    });
                }
                dispatch(LoadTemplate(res.obj));
            }
            else {
                dispatch({
                    type: 'Save_TemplateError',
                    data: res["resMsg"]
                });
            }
        },
        error(XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            dispatch({
                type: 'Save_TemplateError',
                data: textStatus
            });
        }
    });
};
export const previewTemplate = () => (dispatch, getState) => {
    baseSaveTemplate(dispatch, getState, "preview");
};
export const saveTemplate = () => (dispatch, getState) => {
    baseSaveTemplate(dispatch, getState, "");
};
export const publishTemplate = () => (dispatch, getState) => {
    const {MainState}  = getState();
    console.log("publishTemplate");
    dispatch({
        type: 'Publish_TemplateLoading'
    });
    let data = {
        id: $PageProfile["id"],
        publish: true
    };
    //console.log(data);
    $.ajax({
        url: window.formBuildState["TemplatePublishUrl"] + "/" + $PageProfile["id"],
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify(data),
        success(res){
            if (res.res == 1) {
                dispatch({
                    type: 'Publish_TemplateSuccess',
                    data: ""
                });
            }
            else {
                dispatch({
                    type: 'Publish_TemplateError',
                    data: res["resMsg"]
                });
            }
        },
        error(XMLHttpRequest, textStatus) {
            //console.log(XMLHttpRequest);
            //console.log(textStatus);
            dispatch({
                type: 'Publish_TemplateError',
                data: textStatus
            });
        }
    });
};
export const saveForm = list => (dispatch, getState) => {
    const State = getState();
    let res = validate(State);
    //console.log("res" + res);
    if (res == false) {
        dispatch({
            type: 'Validate_false'
        });
        return;
    }
    //console.log("saveForm");
    dispatch({
        type: 'Save_FormLoading'
    });

    let submitComponentList = [];
    let fileIdList = [];
    State["list"].map((panel) => {
        if (panel.type != 'blank') {
            panel.components.map((component, index) => {
                if (component.submit == true) {
                    if (component.type == 'ComShopBox') {
                        //商品组件需要序列化提交的值[{序号，数量}]
                        let value = [];
                        component["options"].map((item, index) => {
                            value.push({index: index, num: item.value});
                        });
                        submitComponentList.push({id: panel.id, value: JSON.stringify(value)});
                    }
                    else if (component.type == 'ComFileUploadBox') {
                        //do nothing
                        fileIdList.push({id: panel.id, uId: component.uId});
                    }
                    else if (component.type == 'ComMultipleCheckBox') {
                        submitComponentList.push({id: panel.id, value: JSON.stringify(component.value)});
                    }
                    else {
                        submitComponentList.push({id: panel.id, value: component.value})
                    }
                }
            });
        }
    });
    if (window.instanceId && window.instanceId != ""){
        //修改表单后，需要重新上传  上传组件中的值
        for (let key in window.lyyStatePicker){
            fileIdList.map((item, index) => {
                if (item.uId == window.lyyStatePicker[key]["uId"]) {
                    submitComponentList.push({id: item.id, value: window.lyyStatePicker[key]["oldFileList"]});
                }
            });
        }
    }
    if (submitComponentList.length == 0) {
        let flag = false;
        for (let key in window.lyyStatePicker){
            for (let ii = 0 ; ii < window.lyyStatePicker[key].fileList.length ; ii ++){
                if (window.lyyStatePicker[key].deleteList[ii] == true){
                    flag = true;
                }
            }
        }
        if (flag == false) {
            dispatch({
                type: 'Save_FormError',
                data: "页面没有数据需要提交"
            });
            return;
        }
    }
    let data = {
        templateId: State.template.id,
		version: State.template.version,
        hidden:State.template.hidden,
        component: submitComponentList
    };
    if (window.instanceId && window.instanceId != ""){
        data = {
            instanceId: window.instanceId,
            templateId: State.template.id,
			version: State.template.version,
            hidden:State.template.hidden,
            component: submitComponentList
        };
    }
    console.log(JSON.stringify(data));
    $.ajax({
        url: window.formBuildState["FormSubmitUrl"],
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(data),
        success(res){
            if (res.res == 1) {
                //获取表单Id后上传文件
                if (res.obj == null) {
                    res.obj = {};
                }
                if ($('.upFileForm').length > 0){
                    //console.log("need uoload " + $('.upFileForm').length);
                    let stateLength = $('.upFileForm').length;
                    for (let key in window.lyyStatePicker){
                        var oMyForm = new FormData();
                        let countUp = 0 ;
                        for (let ii = 0 ; ii < window.lyyStatePicker[key].fileList.length ; ii ++){
                            if (window.lyyStatePicker[key].deleteList[ii] == true){
                                oMyForm.append("file", window.lyyStatePicker[key].fileList[ii]);
                                countUp ++ ;
                            }
                        }
                        if (countUp == 0){
                            stateLength --;
                            if (stateLength == 0) {
                              //  alert("id " + res.obj.instanceId);
                                console.log("save form success");
                                dispatch({
                                    type: 'Save_FormSuccess',
                                    data: res["resMsg"]
                                });
                            }
                            continue ;
                        }
                        oMyForm.append("instanceId", res.obj.instanceId);
                        oMyForm.append("templateId", res.obj.templateId);
                        oMyForm.append("version", res.obj.version);
                        fileIdList.map((item, index) => {
                            if (item.uId == window.lyyStatePicker[key]["uId"]) {
                                oMyForm.append("componentId", item.id);
                            }
                        });

                        $.ajax({
                            url: window.formBuildState.FileUploadUrl,
                            type: 'POST',
                            cache: false,
                            data: oMyForm,
                            processData: false,
                            contentType: false
                        }).done(function(fileres) {
                            stateLength--;
                            if (fileres.res != 1){
                                dispatch({
                                    type: 'Save_FormFileError',
                                    data: '上传文件失败！'
                                });
                            }
                            if (stateLength == 0) {
                               // alert("id " + res.obj.instanceId);
                                console.log("save form success");
                                dispatch({
                                    type: 'Save_FormSuccess',
                                    data: res["resMsg"]
                                });
                            }

                        }).fail(function(res) {
                            console.log("uploadError");
                            // alert("id " + res.obj.instanceId);
                            dispatch({
                                type: 'Save_FormFileError',
                                data: '上传文件失败！'
                            });
                        });
                    }
                }
                else {
                    dispatch({
                        type: 'Save_FormSuccess',
                        data: res["resMsg"]
                    });
                }
            }
            else {
                dispatch({
                    type: 'Save_FormError',
                    data: res["resMsg"]
                });
            }
        },
        error(XMLHttpRequest, textStatus) {
            //console.log(XMLHttpRequest);
            //console.log(textStatus);
            //  window.location.hash="";
            //   console.log("#pageTitle");
            dispatch({
                type: 'Save_FormError',
                data: textStatus
            });
        }
    });
};
export const LoadTemplate = version => (dispatch, getState) => {
    console.log("LoadTemplate");
    dispatch({
        type: 'Load_TemplateLoading'
    });


    let data = sampleData;
    //  let data = {id:123456, version:111, mark:"mark",};
    dispatch({
        type: 'Load_TemplateSuccess',
        data: data
    });
    /*
	var ver = $PageProfile["ver"] || '';
	ver =  version || ver;
    $.ajax({
        url: window.formBuildState["TemplateLoadUrl"] + "/" + $PageProfile["id"],
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
            id: $PageProfile["id"],
            ver: ver,
            hidden:$PageProfile["hidden"] || "-1",
            preVersion: false
        }),
        success(res){
            if (res.res == 1) {
                dispatch({
                    type: 'Load_TemplateSuccess',
                    data: res["obj"]
                });
            }
            else {
                dispatch({
                    type: 'Load_TemplateError',
                    data: res["resMsg"]
                });
            }

        },
        error(XMLHttpRequest, textStatus) {
            //console.log(XMLHttpRequest);
            //console.log(textStatus);
            dispatch({
                type: 'Load_TemplateError',
                data: textStatus
            });
        }
    });*/
};
export const LoadFormTemplate = () => (dispatch, getState) => {
    //   console.log("LoadFormTemplate");
    dispatch({
        type: 'Load_TemplateLoading'
    });
    let data = sampleData;
    //  let data = {id:123456, version:111, mark:"mark",};
    dispatch({
        type: 'Load_TemplateSuccess',
        data: data
    });
    /*
    $.ajax({
        url: window.formBuildState["TemplateLoadUrl"] + "/" + $PageProfile["id"],
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
            id: $PageProfile["id"],
			ver: $PageProfile["ver"],
            hidden:$PageProfile["hidden"] || "-1",
            preVersion: false
        }),
        success(res){
            if (res.res == 1) {
                dispatch({
                    type: 'Load_TemplateSuccess',
                    data: res["obj"]
                });
            }
            else {
                dispatch({
                    type: 'Load_TemplateError',
                    data: res["resMsg"]
                });
            }

        },
        error(XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            dispatch({
                type: 'Load_TemplateError',
                data: textStatus
            });
        }
    });*/
};
export const LoadFormData = (dataId) => (dispatch, getState) => {
    dispatch({
        type: 'Load_TemplateLoading'
    });
    console.log("LoadFormData");
    window.instanceId = $PageProfile["instanceId"];

    dispatch({
        type: 'Load_FormDataSuccess',
        data: sampleFormData
    });
    /*
    $.ajax({
        url: window.formBuildState["FormDataUrl"] + "/" + $PageProfile["instanceId"],
        method: "get",
        contentType: "application/json",
        success(res){
            if (res.res == 1) {
                dispatch({
                    type: 'Load_FormDataSuccess',
                    data: res["obj"]
                });
            }
            else {
                dispatch({
                    type: 'Load_TemplateError',
                    data: res["resMsg"]
                });
            }

        },
        error(XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            dispatch({
                type: 'Load_TemplateError',
                data: textStatus
            });
        }
    });*/
}
export const LoadFormEditData = (dataId) => (dispatch, getState) => {
    dispatch({
        type: 'Load_TemplateLoading'
    });
    console.log("LoadFormData");
    window.instanceId = $PageProfile["instanceId"];
    $.ajax({
        url: window.formBuildState["FormDataUrl"] + "/" + $PageProfile["instanceId"],
        method: "get",
        contentType: "application/json",
        success(res){
            if (res.res == 1) {
                dispatch({
                    type: 'Load_FormDataSuccess',
                    data: res["obj"]
                });
            }
            else {
                dispatch({
                    type: 'Load_TemplateError',
                    data: res["resMsg"]
                });
            }

        },
        error(XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            dispatch({
                type: 'Load_TemplateError',
                data: textStatus
            });
        }
    });
};