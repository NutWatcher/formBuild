/**
 * Created by lyy on 2016/12/30.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import './App.less';
import Main from './MainPage'
import Components from './ComponentPage'
import Property from './PropertyPage'
import ConnectedMove from './MovePage'
import TopTool from './TopToolPage'
import Modal from './ModalPage'
import {saveTemplate} from '../actions/http'
import {dragProperty,
    dragComponent, releaseComponent,
    dragMainPageItem}from '../actions/drag'
export class Background extends Component {
    render() {
        const { src, pageState } = this.props ;
        console.log("src");
        console.log(src);
        console.log(pageState);
        let style = {};
        if (src != ""){
            style={backgroundImage: 'url(' + src + ')'}
        }
        return (
            <div className = "backgroundWrap" style={style}>
            </div>
        )
    }
}
function mapBackgroundStateToProps(state) {
   // console.log("state.MainState.pageState");
   // console.log(state.MainState.pageState);
    return {
        pageState:state.MainState.pageState,
        src:state.MainState.pageState.config.backgroundImage
    };
}
const BackgroundContent = connect(mapBackgroundStateToProps)(Background);
export class App extends Component {
    constructor(props){
        super(props);
        const { handleMainAdd, handleSwapPropertySelectListItem, handleSwapMainPageItem, handleSwapPropertyCheckListItem } = props;
        window.lyyState={
            preX:0,
            preY:0,
            catchY:0,
            catchX:0
        };
        window.lyyRender="template"; //加载渲染环境
        document.addEventListener("mousemove",(e)=>{
            if (e.clientX == window.lyyState.preX &&
                e.clientY == window.lyyState.preY
            ){
                return ;
            }
            /*if (Math.abs(window.lyyState.preY - e.clientY) < 2){
                return ;
            }
            if (Math.abs(window.lyyState.preX - e.clientX) < 2){
                return ;
            }*/
            window.lyyState.preY =  e.clientY;
            window.lyyState.preX =  e.clientX;
            if( window.lyyState.startComponentDrag == true){
                return dragComponent(e.clientX, e.clientY );
            }
            if (window.lyyState.startChangeListItem  == true){
                return dragProperty(e.clientY);
            }
            if (window.lyyState.startChangeMainPageListItem  == true){
                return dragMainPageItem(e.clientX, e.clientY);
            }
           /* if (Math.abs(window.lyyState.preY - e.clientY) < window.lyyState.catchY){
                return ;
            }
            handleMouseMove(e.clientX, e.clientY);*/
        });
        document.addEventListener("mouseup",(e)=>{
            let btnNum = e.button;
            if (btnNum!=0)//不是鼠标左键
            {
                return ;
            }
            //console.log(window.lyyState.startComponentDrag);
            if(window.lyyState.startComponentDrag == true){
                window.lyyState.startComponentDrag = false;
                if(window.lyyState.Item["drop"] == true){
                    $('#MovePage').addClass('hide');
                    releaseComponent(false);
                    return handleMainAdd();
                }
                return releaseComponent(true);
            }
            if(window.lyyState.startChangeListItem == true){
                window.lyyState.startChangeListItem = false;
                if (window.lyyState.Item["id"] == 'PropertyMultipleCheckBoxList'){
                    window.lyyState.Item["id"] = "";
                    return handleSwapPropertyCheckListItem();
                }
                return handleSwapPropertySelectListItem();
            }
            if (window.lyyState.startChangeMainPageListItem  == true){
                window.lyyState.startChangeMainPageListItem = false;
                return handleSwapMainPageItem();
            }
           // handleMouseUp();
        });
    }
    handleSaveTemplate =(e)=>{
        const { saveTemplate, list } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        saveTemplate(list);
    };
    render() {
        const { list  } = this.props ;
        return (
            <div className = "board">
                <BackgroundContent />
                <div className = "app" >
                    <TopTool />
                    <Components />
                    <Main  />
                    <Property />
                    <div id="moveWarp" className="hide" />
                </div>
                <Modal />
                <ConnectedMove />
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    return {...state}
}
function mapDispatchToProps(dispatch) {
    return {
        handleSwapPropertySelectListItem:()=>{
            dispatch({
                type: 'Swap_PropertySelectListItem'
            });
        },
        handleSwapPropertyCheckListItem:()=>{
            dispatch({
                type: 'Swap_PropertyCheckListItem'
            });
        },
        handleSwapMainPageItem:()=>{
            dispatch({
                type: 'Swap_MainPageItem'
            });
        },
        handleMainAdd:() => {
            dispatch({
                type: 'Drop_MainItem'
            });
        }
    };
}
const AppContent = connect(mapStateToProps,mapDispatchToProps)(App);
export default AppContent