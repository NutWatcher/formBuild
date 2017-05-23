/**
 * Created by lyy on 2017/1/2.
 */
import MapConfig from '../formMap/index';
export default  (state={componentPageList:[],moveState:{}} , action) => {
    if (action.type === "MouseDown_ComponentPageItem") {
        state.moveState = {
            big: false,
            select: true,
            show: false,
            back: false,
            text: action.text,
            icon: action.icon,
            left: action.left,
            top: action.top,
            mouseX: action.mouseX,
            mouseY: action.mouseY,
            moveX: 0,
            moveY: 0
        };
        //console.log("MouseDown_ComponentPageItem");
        return {...state}
    }
    else if (action.type === "Move_ComponentPageItem") {
        if (state.moveState && state.moveState["select"] == true) {
                //console.log("Move_ComponentPageItem");
            state.moveState["show"] = true;
        }
        return {...state}
    }
    else if (action.type === "MouseMove_App") {
          //console.log("MouseMove_App");
        if (action.mouseX != state.moveState.mouseX || action.mouseY != state.moveState.mouseY) {
            state.moveState["show"] = true;
        }
        if (state.moveState && state.moveState["select"] == true) {
            state.moveState["moveX"] = action.mouseX - state.moveState.mouseX;
            state.moveState["moveY"] = action.mouseY - state.moveState.mouseY;
        }
        return {...state}
    }
    else if (action.type === "MouseUp_App") {
        //     console.log("MouseUp_App");
        if (state.moveState && state.moveState["select"] == true && state.moveState["show"] == true) {
            state.moveState["back"] = true;
            state.moveState["select"] = false;
        }
        return {...state}
    }
    else if (action.type === "MouseOver_Main") {
        //   console.log("MouseOver_Main");
        if (state.moveState && state.moveState["select"] == true) {
            state.moveState["big"] = true;
        }
        return {...state}
    }
    else if (action.type == "Select_ComponentPageItem") {
        //console.log("Select_ComponentPageItem");
        state.moveState = {
            big: false,
            select: false,
            show: false,
            back: false
        };
        state.MainState = state.MainState || {list: [], index: 0};
        let newPanel = {
            select: false,
            propertyComponents: MapConfig[action.componentType].propertyConfig,
            components: [MapConfig[action.componentType].config],
            order: state.MainState["index"],
            uId: state.MainState["index"]
        };
        state.MainState["list"] = [...state.MainState["list"],
            newPanel
        ];
        state.MainState["index"]++;
        //console.log(state.MainState);
        return {...state}
    }
    switch (action.type) {
        default:
            return {...state}
    }
}