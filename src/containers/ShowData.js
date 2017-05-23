/**
 * Created by lyy on 2016/12/30.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import {saveForm, LoadFormData} from '../actions/http'
import './ShowData.less';
import ComLayout from './component/Layout'
import Modal from './ModalPage'

class ShowItem extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            type : props.value.type || "" ,
            title : props.value.label || "" ,
            count : props.value.count || 0,
            value : props.value.value || ""
        }
    }
    render(){
        console.log(this.state);
        console.log(this.state.type);
        if (this.state.type == 'ComFileUploadBox'){
            return (
                <div className="item">
                    <div>
                        <p className="title">{this.state.title}</p>
                    </div>
                    <div>
                        {
                            this.state.value.map((item , index)=>{
                                return(
                                <p key={index}  className="content_download"><a href={item.src} >{item.name}</a></p>
                                )
                            })
                        }

                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
            )
        }
        else if (this.state.type == 'ComMultipleSelectBox'){
            return (
                <div className="item">
                    <div>
                        <p className="title">{this.state.title}</p>
                    </div>
                    <div>
                        {
                            this.state.value.map((item , index)=>{
                                return(
                                    <p key={index}  className="content_download">第{index+1}个选项: {item}</p>
                                )
                            })
                        }

                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
            )
        }
        else if (this.state.type == 'ComMultipleCheckBox'){
            return (
                <div className="item">
                    <div>
                        <p className="title">{this.state.title}</p>
                    </div>
                    <div>
                        {
                            JSON.parse(this.state.value).map((item , index)=>{
                                return(
                                    <p key={index} className="content">{item.name} : {item.value}</p>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        else if (this.state.type == 'ComShopBox'){
            return (
                <div className="item">
                    <div>
                        <p className="title">{this.state.title}</p>
                    </div>
                    <div>
                        {
                            this.state.value.map((item , index)=>{
                                return(
                                    <p key={index} className="content">{item.name} : {item.num || 0} * {item.price*item.rate}元/{item.unit}</p>
                                )
                            })
                        }
                        <p className="content">合计：{this.state.count}元</p>
                    </div>
                </div>
            )
        }
        return(
            <div className="item">
                <div>
                    <p className="title">{this.state.title}</p>
                </div>
                <div className="content">
                    <p >{this.state.value.toString()}</p>
                </div>
            </div>
        )
    }
}
export class Preview extends Component {
    constructor(props) {
        console.log("start");
        window.formBuildState.upload = [];
        super(props);
        window.lyyRender="form"; //加载渲染环境识别记号
    }
    handleSaveForm = (e) =>{
        const {saveForm} = this.props ;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        saveForm();
    };
    componentDidMount = () => {
        console.log("componentDidUpdate");
        const { tip, loadTemplate, LoadFormData } = this.props ;
        if (loadTemplate == true){
            LoadFormData();
            window.showList = true;
        }
    };
    componentDidUpdate = () => {
       /* console.log("componentDidUpdate");
        const { tip, loadTemplate, LoadFormData } = this.props ;
        if (loadTemplate == true){
            LoadFormData();
            window.showList = true;
        }*/
    };
    render() {
        const { list, pageState } = this.props ;
        let { tip } = this.props ;
    //    console.log("render list");
        /*console.log(list);
        console.log("pageState");
        console.log(tip);*/
        if (tip && tip != ""){
            tip = "(" + tip + ")";
        }
        return (
            <div style={{height:"100%"}}>
                <div className = "backgroundWrap" style={pageState.backgroundImage==""?null:{backgroundImage: 'url(' + pageState.backgroundImage + ')'}}>
                </div>
                <div className = "boardWarp">
                    <div className = "board">
                        <div className = "contentWarp" >
                            <div className="MainTop">
                                <div id="pageTitle" className="MainTopContent">
                                    <h2>{pageState.title}<span className="ErrorTitle" style={{color:"red"}}>{tip}</span></h2>
                                    <p> {pageState.description}</p>
                                </div>
                            </div>
                            {
                                window.showList == true ?
                                list.map((panel, index)=>{
                                    return (<ShowItem
                                        key = {index}
                                        value={panel}
                                    />)
                                })
                                    : null
                            }
                        </div>
                        <Modal />
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let list = state.list||[];

    return {
        loadTemplate:state.loadTemplate || false,
        list:list,
        pageState:state.pageState,
        tip:state.pageState.tip
    }
}
const mapDispatchToProps = {
    LoadFormData:LoadFormData,
    saveForm:saveForm
};
const ContentPreview = connect(mapStateToProps,mapDispatchToProps)(Preview);
export default ContentPreview