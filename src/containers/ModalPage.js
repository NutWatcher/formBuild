/**
 * Created by lyy on 2016/12/28.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import './ModalPage.less';
export class SuccessRedirect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            redirect:props.redirect,
            showBtn:false,
            second : props.time || 3
        }
    }
    closePage = () => {
        window.close();
    }
    componentDidUpdate = () => {
        let self = this ;
        if (this.state.second <= 0){
            return ;
        }
        var tempSetTimeOut = setTimeout(function() {
            console.log(self.state);
            if (self.state.second <= 1){
                if (self.state.redirect == false) {
                    self.props.HandelCancel();
                    clearTimeout(tempSetTimeOut);
                    return ;
                }

                window.location.href = window.formBuildState.FormSubmitSuccessRedirectUrl || "https://www.baidu.com";
                self.setState({
                    title: self.state.title,
                    redirect: self.state.redirect,
                    showBtn:true,
                    second: 0
                });
            }
            else {
                self.setState({
                    title: self.state.title,
                    redirect: self.state.redirect,
                    showBtn:false,
                    second: self.state.second - 1
                });
            }
        }, 1000)
    };
    componentDidMount = () => {
        let self = this ;
        setTimeout(function() {
            console.log(self.state);
            self.setState({
                second : self.state.second - 1
            });
        }, 1000)
    };
    render() {
        return(
            <div className="FormSuccessWrap">
                <div className="icon">
                    <img src={window.formBuildState.ImageLocation + '/success.png'}></img>
                </div>
                <div className="contentWarp">
                    {
                        this.state.second > 0 ?
                        <div className="content">{this.state.title}{this.state.second}秒</div> :
                            <div className="content">提交成功</div>
                    }
                </div>
                <div className="btnWrap">
                    <span
                        className={"FormSuccessWrap_btn " + (this.state.showBtn?"":"disabled")}
                        onClick={this.state.showBtn?this.closePage:""}>关闭页面</span>
                </div>
            </div>
        );
    }
}
export class Modal extends Component {
    HandelCancel = () =>{
        const {HandelCancel} = this.props ;
        HandelCancel();
    };
    render() {
        const {active, title , content, showBtn, formSuccess, redirect, HandelCancel} = this.props;
        if (formSuccess == true && active == true){
            if (redirect == true){
                return(
                    <div className = "ModalWarp">
                        <SuccessRedirect HandelCancel = {this.HandelCancel}
                            showBtn={showBtn} redirect={redirect} title={"提交成功："}/>
                    </div>
                )
            }
            else{
                return(
                    <div className = "ModalWarp">
                        <div className="FormSuccessWrap">
                            <div className="contentCenter"><SuccessRedirect
                                HandelCancel={this.HandelCancel} redirect={redirect} time={2} title={"文件太大："}/></div>
                        </div>
                    </div>
                )
            }

        }
        if (active == true){
            return(
                <div className = "ModalWarp">
                    <div className="AlertPop">
                        <div className="title">{title}</div>
                        <div className="content">{content}</div>
                        <div className="btnWrap">
                            <button 
                                className={showBtn?"":"disabled"}
                                disabled={showBtn?"":"disabled"} 
                                onClick={this.HandelCancel}>确定</button>
                        </div>
                       
                    </div>
                </div>
            )
        }
        return null;
    }
}

function mapStateToProps(state) {
   // console.log(state);
    //console.log(state.ModalState);
    return {
        active:state.ModalState.active,
        title:state.ModalState.title,
        redirect:state.ModalState.redirect || false,
        content:state.ModalState.content,
        showBtn:state.ModalState.showBtn,
        formSuccess:state.ModalState.formSuccess || false
    };
}
const mapDispatchToProps = {
    HandelCancel:()=>(dispatch)=>{
        dispatch({
            type: 'Cancel_Modal'
        });
    }
};
const ConnectedModal = connect(mapStateToProps, mapDispatchToProps)(Modal);
export default ConnectedModal