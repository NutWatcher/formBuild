/**
 * Created by lyy on 2017/1/9.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './ShopBox.less';
export class ComShopItemBox extends Component {
    subItem = (e)=>{
        const {index, uId, changItemNum} = this.props ;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        changItemNum(uId, index, "sub");
    };
    addItem = (e)=>{
        const {index, uId, changItemNum} = this.props ;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        changItemNum(uId, index, "add");
    };
    render() {
        const {
            index, uId, src, withImage,currency, shopRate ,
            shopName ,unitPrice, unitName, value, description
        } = this.props ;
        let styleForm = "";
        if (window.lyyRender=="form"){
            //填写表单时样式
            styleForm = "styleForm";
        }
        return (
            <div className = {"ComShopItemBox " + styleForm}>
                {
                    withImage == true ?
                        <div className = "image">
                            <img src={src}
                                 className="img"/>
                        </div>
                        :null
                }
                <div className = "info">
                    <div>
                        <span className = "bold">{shopName}</span>
                        <span className = "bold cRed">
                            {
                                currency == "￥" ? null : "(汇率：1:" + shopRate + ")"
                            }
                        </span>
                    </div>
                    <div><span>{description}</span></div>
                    <div>
                        <div className = "fl cRed">
                            <span>{currency}{unitPrice}</span>/
                            <span>{unitName}</span>
                        </div>
                        <div className = "fr ">
                            <a className="btn" onClick={this.subItem.bind(this)}>-</a>
                            <input value ={value} onChange={()=>{}} />
                            <a className="btn" onClick={this.addItem.bind(this)}>+</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapShopItemStateToProps(state,props) {
    let component = props.component;
   // console.log(component);
    return {
        uId:props.uId,
        index : props.index,
        src : component.src,
        shopRate:component.rate||1,
        shopName:component.shopName||"",
        unitPrice : component.unitPrice||"",
        currency :component.currency ||"￥",
        unitName:component.unitName||"",
        value:component.value||"0",
        description:component.description||"",
        withImage:props.withImage||false,
    };
}
function mapShopItemDispatchToProps(dispatch) {
    return {
        changItemNum: (uId, index, param) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                index:index,
                param:param
            });
        }
    };
}
const ConnectedComShopItemBox = connect(mapShopItemStateToProps, mapShopItemDispatchToProps)(ComShopItemBox);
export class ComShopBox extends Component {
    render() {
        const { label , tip, uId, list, withImage, description, require, validated} = this.props ;
        return (
            <div className = "ComShopBox ">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    require  ? <p className="red">*</p> :null
                }
                <span className="validated">{validated}</span>
                <div className="description">{description}</div>
                <div className="cl"></div>
                {
                    list.map((item, index)=>{
                        return (
                            <ConnectedComShopItemBox 
                                index={index} uId={uId} key={index}
                                component={item} withImage={withImage}
                            />
                        )
                    })
                }
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        list:componentPoint.options||[],
        label:componentPoint.label||"",
        tip:componentPoint.tip||null,
        description:componentPoint.description||"",
        withImage:componentPoint.withImage||false,
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        require:componentPoint.require||false,
        validated:componentPoint.validated == null ? null:componentPoint.validated
    };
}
const ConnectedComShopBox = connect(mapStateToProps)(ComShopBox);
export default ConnectedComShopBox