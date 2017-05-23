/**
 * Created by lyy on 2017/1/2.
 */
/**
 *  主页面逻辑
 */
const changePropertyState = (state , action) => {
    switch (action.type) {
        case "Change_PropertyPage":
            //console.log("changePropertyState  Select_MainItem+ " + action.propertyComponents);
            state.propertyComponents = action.propertyComponents;
            return { ...state};
        case "Render_PropertyPage":
            state.propertyComponents = action.propertyComponents;
            return { ...state};
        default:
            return state
    }
};
const Select_PageState = (state , action) => {
    console.log("Select_PageState");
    state.propertyComponents = action.component.propertyConfig;
    console.log(state.propertyComponents);
    return { ...state};
};
export default  (state={} , action) => {
    switch (action.type) {
        case "Change_PropertyPage":
            return changePropertyState(state, action);
        case "Render_PropertyPage":
            return changePropertyState(state, action);
        case "Select_PageState":
            return Select_PageState(state, action);
        case "Delete_PropertyPage":
            return { ...state,propertyComponents:[]};
        case "Load_TemplateSuccess":
            return { ...state,propertyComponents:[]};
        default:
            return state
    }
}