/**
 * Created by lyy on 2017/1/8.
 */
import  * as http from  './http'
const Save_TemplateLoading = (state, action) =>{
    state.active = true;
    state.showBtn = true;
    state.content = "正在保存中...";
    state.title = "保存中...";
    console.log("Save_TemplateLoading");
    return state;
};
export default  (state={} , action) => {
    switch (action.type) {
        case "Save_TemplateLoading":
            return Save_TemplateLoading(state, action);
        case "Save_TemplateError":
            return http.Save_TemplateError(state, action);
        case "Load_TemplateLoading":
            return http.Load_TemplateLoading(state, action);
        case "Load_TemplateSuccess":
            return {...state, active:false};
        case "Load_TemplateError":
            return http.Load_TemplateError(state, action);

        case "Publish_TemplateSuccess":
            return http.Publish_TemplateSuccess(state, action);
        case "Publish_TemplateLoading":
            return http.Publish_TemplateLoading(state, action);
        case "Publish_TemplateError":
            return http.Publish_TemplateError(state, action);

        case "Cancel_Modal":
            return {...state,active:false};
        case "Go_PreviewPage":
            return {...state,active:false};

        default:
            return state
    }
}