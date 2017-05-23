/**
 * Created by lyy on 2016/12/28.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom';
import {saveTemplate, previewTemplate} from '../actions/http'
import ComLayout from './component/Layout'
import './MainPage.less';

export class MainContentPanel extends Component {
    handleMouseOver = (order, e) => {
        const { handleMouseOver } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleMouseOver(order);
    };
    handleMouseDown = (order, e) => {
        const { handleMouseDown, uId, index } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let btnNum = e.button;
        if (btnNum!=0)//不是鼠标左键
        {
            return ;
        }
        window.lyyState.startChangeMainPageListItem = true;
        window.lyyState.Item = {
            index:index,
            uId:uId
        };
    };
    handleClick = (order, propertyComponents, e) => {
        const { handleClick } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let btnNum = e.button;
        if (btnNum!=0)//不是鼠标左键
        {
           return ;
        }
        handleClick(order, propertyComponents);
    };
    handlePreventMouseDown=(e)=>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };
    handleCopyPanel = (uId, e)=>{
        const { handleCopyPanel } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleCopyPanel(uId);
    };
    handleDeletePanel = (uId, e) =>{
        const { handleDeletePanel } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleDeletePanel(uId);
    };
    componentDidUpdate(){
        let com = findDOMNode(this);
        window.lyyStateTemp = window.lyyStateTemp || {}
        $($(com).find('.handle')[0]).height($(com).height());
    }
    render() {
        //console.log("render MainContentPanelList");
        const {type, height, uId, select,
            components, propertyComponents,
            panelStyle, panelClass, position, hide} = this.props ;
        var cc =  [{name:"ComTextBox",attribute:{label:"label",defaultValue:"提示"}},
            {name:"ComTextBox",attribute:{label:"label",defaultValue:"提示"}}];
        if (type == "blank"){
            //console.log("blank +" + height);
            return (
                <li className="field preFocus" style={{display:hide==true?"none":""}}>
                    <div style={{height:height+"px"}}>
                    </div>
                </li>
            )
        }
        return (
            <li className={"field " + panelClass + " " + (position=="fly"?"fly":"")}
                title="点击编辑，拖动排序"
                style={panelStyle}
                onMouseOver={this.handleMouseOver.bind(this,uId)}
                onMouseDown={this.handleMouseDown.bind(this,uId)}
                onClick={this.handleClick.bind(this,uId, propertyComponents)}
            >
                <ComLayout
                    uName={"mainLayout + " + uId}
                    components={components}
                    style={panelStyle}/>
                <div className="fieldActions hide " style={{"display": select == true ? "block":"none"}}>
                    <i title="复制" href="#" className="iconfont faDup"
                       onMouseDown={this.handlePreventMouseDown}
                       onClick={this.handleCopyPanel.bind(this,uId)}
                    >&#xe60b;</i>
                    <i title="删除" href="#" className="iconfont faDel"
                       onMouseDown={this.handlePreventMouseDown}
                       onClick={this.handleDeletePanel.bind(this,uId)}
                    >&#xe619;</i>
                </div>
                <div className="handle" style={{"top": "-1px","left": "-1px","width": "553px",zIndex:100}}>
                    <i title="拖动排序" className="iconfont move hide" style={{"display":"none","lineHeight": "71px"}}></i>
                </div>
            </li>
        )
    }
}
function mapPanelStateToProps(state,props) {
   // console.log("mapPanelStateToProps");
   // console.log(state);
    return {...state.MainState["list"][props.index],index:props.index}
}
function mapPanelDispatchToProps(dispatch) {
    return {
        handleCopyPanel: (uId) => {
            dispatch({
                type: 'Copy_MainItem',
                uId:uId
            });
        },
        handleDeletePanel: (uId) => {
            dispatch({
                type: 'Delete_MainItem',
                uId:uId
            });
            dispatch({
                type: 'Delete_PropertyPage'
            });
        },
        handleClick: (uId, propertyComponents) => {
            dispatch({
                type: 'Select_MainItem',
                uId:uId
            });
            dispatch({
                type: 'Change_PropertyPage',
                propertyComponents:propertyComponents
            });
        },
        handleMouseOver: (uId) => {
            dispatch({
                type: 'MouseOver_MainItem',
                uId:uId
            });
        },
    };
}
const ConnectedMainContentPanel = connect(mapPanelStateToProps, mapPanelDispatchToProps)(MainContentPanel);

export class MainContent extends Component {
    handlePreviewTemplate = (e) => {
        const {  previewTemplate } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        previewTemplate();
    };
    handleSaveTemplate= (e) => {
        const { saveTemplate } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        saveTemplate();
    };
    handleOnClickPage= (pageState, e) => {
        const { Select_PageState } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        Select_PageState(pageState);
    };
    componentDidUpdate(){
        const { dropNewItem, autoSelect, handleAutoSelectItem } = this.props;
        const { Select_PageState, pageState } = this.props;
        if (autoSelect.select == true && autoSelect.pageState == true){
            console.log(autoSelect);
            Select_PageState(pageState);
        }
        else if (dropNewItem.drop == true){
            console.log(dropNewItem);
            handleAutoSelectItem(dropNewItem.uId, dropNewItem.newPanel);
        }
        else if (autoSelect.select == true){
            console.log(autoSelect);
            handleAutoSelectItem(autoSelect.uId, autoSelect.newPanel);
        }
        
    }
    render() {
        const { list, pageState,
            title , description, headImage , backgroundImage } = this.props ;
        console.log("render MainContent");
        console.log(list);
        let showHeadImg = false;
        if(headImage && headImage != ""){
            showHeadImg = true;
        }
        return (
            <div className="Main">
                <div className="MainTop"
                     onClick={this.handleOnClickPage.bind(this, pageState)}>
                    {
                        showHeadImg == true ?
                            <img src={headImage}/> : null
                    }
                    <div className="MainTopContent">
                        <h2>{title}</h2>
                        <p> {description}</p>
                    </div>
                </div>

                <ul id="MainUl">
                    {
                        list.map((component, index) => {
                            return (<ConnectedMainContentPanel
                                key = {index}
                                index={index}
                                uId={component.uId}
                            />)
                        })
                    }
                    <li id="mainLiBlank" style={{height:list.length>1?"200px":"400px"}}>
                    </li>
                </ul>

                <div className="buttonWrap">
                    <a className="btn" id="preview" onClick={this.handlePreviewTemplate}>预览</a>
                    <a className="btn blue" id="save" onClick={this.handleSaveTemplate} >保存</a>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state,props) {
    return {
        autoSelect: state.MainState.eventList.autoSelect||{select:false},
        dropNewItem: state.MainState.eventList.dropNewItem||{drop:false},
        pageState:state.MainState["pageState"],
        title:state.MainState["pageState"]["config"].title,
        description:state.MainState["pageState"]["config"].description,
        headImage:state.MainState["pageState"]["config"].headImage,
        backgroundImage:state.MainState["pageState"]["config"].backgroundImage,
        list:state.MainState["list"]
    }
}
const mapDispatchToProps = {
    Select_PageState:(pageState)=>(dispatch)=>{
        dispatch({
            type: 'Select_PageState',
            component:pageState
        });
    },
    handleAutoSelectItem: (uId, propertyComponents) => (dispatch) => {
        dispatch({
            type: 'Select_MainItem',
            uId:uId
        });
        dispatch({
            type: 'Change_PropertyPage',
            propertyComponents:propertyComponents
        });
    },
    previewTemplate:previewTemplate,
    saveTemplate:saveTemplate
};
const ConnectedMainContent = connect(mapStateToProps,mapDispatchToProps)(MainContent);
export default ConnectedMainContent