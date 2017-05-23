/**
 * Created by lyy on 2016/12/30.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import {saveForm} from '../actions/http'
import './Preview.less';
import ComLayout from './component/Layout'
import Modal from './ModalPage'

class QrCode extends Component {
    constructor(props){
        super(props);
        this.state = {
            show : false
        }
    }
    render(){
        let self = this;
        return(
            <div
                onClick={
                    function () {
                        self.setState({show:self.state.show == false})
                    }
                }
                className="formQrcodeWarp" style={{backgroundImage: 'url(' + window.formBuildState.ImageLocation  + '/qrcode_icon.png)'}}>
                <div className="formQrcode" style={  this.state.show == false ?{display:"none"}:{}}>
                    <div id="formQrcode"></div>
                    <p>扫一扫分享给好友</p>
                </div>
            </div>
        )
    }
}
/**
 * 购买商品时出现的结算组件
 */
export class checkListBox extends Component {
    render() {
        const { shopList, count } = this.props ;
       // console.log("render list");
      //  console.log(shopList);
        if (shopList.length == 0){
            return null;
        }
        return (
            <div className="checkWrap">
                <div className="check">
                    {
                        shopList.map((shop, index)=>{
                            return (
                                <div key={index}>
                                    <p className="shopsName">{shop.name}</p>
                                    {
                                        shop["items"].map((item, key)=>{
                                            return(
                                                <div key={key} className="shop">
                                                    <p className="shopName">{item.name}</p>
                                                    <p className="shopCheck">{item.price*item.rate}元/{item.unit} × {item.num}</p>
                                                    <div style={{"clear":"both"}}></div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            )
                        })
                    }
                    <div className="shopsCount">
                        <p className="fr">金额</p>
                        <p className="fr red">{count}</p>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}
function mapCheckListStateToProps(state) {
   // console.log("shopList");
   // console.log(state["checkState"]["shopList"]);
    return {
        shopList:state["checkState"]["shopList"]||[],
        count:state["checkState"]["count"]||0,
        render:state["checkState"]["render"]||0,
    }
}
const ConnectCheckListBox = connect(mapCheckListStateToProps)(checkListBox);
export class Preview extends Component {
    constructor(props) {
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
        console.log(window.location.href);
        $.ajax({
            url:'http://suo.im/api.php',
            type: "get",
            dataType:'jsonp',
            data:{
                format:"jsonp",
                url:window.location.href
            },
            success:function (res) {
                console.log(res);
                if (res.err == ""){
                    $('#formQrcode').qrcode({width: 100,height: 100,text: res.url});
                }
                else{
                    $('#formQrcode').qrcode({width: 100,height: 100,text: window.location.href});
                }
            },
            error:function (e) {
                console.log(e);
                $('#formQrcode').qrcode({width: 100,height: 100,text: window.location.href});
            }
        });

    };
    componentDidUpdate = () => {
        const { tip } = this.props ;
        if (tip && tip!= "" ){
        //    window.location.hash="#pageTitle";
        }
        else {
       //     window.location.hash="";
        }
    };
    render() {
        const { list, pageState } = this.props ;
        let { tip } = this.props ;
        /*console.log("render list");
        console.log(list);
        console.log("pageState");
        console.log(tip);*/
        if (tip && tip != ""){
            tip = "(" + tip + ")";
        }
        let showHeadImg = false;
        if(pageState.headImage && pageState.headImage != ""){
            showHeadImg = true;
        }
        return (
            <div style={{height:"100%"}}>
                <div className = "backgroundWrap" style={pageState.backgroundImage==""?null:{backgroundImage: 'url(' + pageState.backgroundImage + ')'}}>
                </div>
                <div className = "boardWarp">
                    <div className = "board">
                        <QrCode />
                        <div className = "contentWarp" >
                            <div className="MainTop">
                                {
                                    showHeadImg == true ?
                                        <img src={pageState.headImage}/> : null
                                }

                                <div id="pageTitle" className="MainTopContent">
                                    <h2>{pageState.title}<span className="ErrorTitle" style={{color:"red"}}>{tip}</span></h2>
                                    <p> {pageState.description}</p>
                                </div>
                            </div>
                            {
                                list.map((panel, index)=>{
                                    return (<ComLayout
                                        key = {index}
                                        uName={"mainLayout + " + index}
                                        components={panel.components}
                                        style={{paddingTop:"15px"}}
                                    />)
                                })
                            }
                            <ConnectCheckListBox />
                            <div className="bottom"></div>
                            <div className="buttonWrap">
                                <a type="button" className="btn" id="preview"
                                        href="#pageTitle"
                                        onClick={this.handleSaveForm}  >提交</a>
                            </div>
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
        list:list,
        pageState:state.pageState,
        tip:state.pageState.tip
    }
}
const mapDispatchToProps = {
    saveForm:saveForm
};
const ContentPreview = connect(mapStateToProps,mapDispatchToProps)(Preview);
export default ContentPreview