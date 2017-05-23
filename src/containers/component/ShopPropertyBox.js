/**
 * Created by lyy on 2017/1/9.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import ComImageUploadComponent from './ImageUploadComponent'
import './ShopPropertyBox.less';
export class ComShopPropertyItemBox extends Component{
    handleOnChangeProperty=(uId, index, params, e)=>{
        const { handleOnChangeProperty } = this.props ;
        if (params == "rate"){
            console.log(e.target.value);
            console.log(isNaN(e.target.value));
            if (isNaN(e.target.value) || e.target.value.trim() == ""){
                return;
            }
        }
        else if( params == "currency" && e.target.value == "￥"){
            handleOnChangeProperty(uId, index, "rate", 1);
        }
        handleOnChangeProperty(uId, index, params, e.target.value);
    };
    handleOnClick=(uId, index, type , e)=>{
        const { handleOnChangeProperty } = this.props ;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChangeProperty(uId, index, type);
    };
    handleOnClickItem=(uId, index, e)=>{
        console.log("handleOnClickItem");
        const { handleOnClickItem } = this.props ;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnClickItem(uId, index);
    };
    uploadImage=(src)=>{
        const { handleOnChangeProperty, index, uId } = this.props ;
        console.log(index);console.log(src);
        handleOnChangeProperty(uId, index, "src", src);
    };
    render() {
        const { index, uId, select, withImage, src, currency, rate,
        shopName, description, unitPrice, unitName } = this.props ;
        const { handleOnChangeProperty } = this.props ;
        if (select){
            return (
                <div className = "ComShopPropertyItemBox">
                    <div className={"select " + (index==0?"top":"")}>
                        <div className="topWrap">
                            <div className="topWrapLabel">
                                <p>{shopName}</p>
                            </div>
                            <div className="btnS">
                                <a className="icononly-add iconfont" title="添加一个新的选择项"
                                   onClick={this.handleOnClick.bind(this, uId, index,"copy")}
                                >&#xe60b;</a>
                                <a className="icononly-del iconfont" title="删除此选择项"
                                   onClick={this.handleOnClick.bind(this, uId, index,"delete")}
                                >&#xe619;</a>
                            </div>
                        </div>
                        <div className="topWrap">
                            {
                                withImage == true?
                                    <div className="image vc">
                                        <ComImageUploadComponent
                                            finishUpload={this.uploadImage}
                                            picker={"ComShopPropertyItemBox" + index}
                                            src={src} />
                                    </div>
                                    :null
                            }
                            <div className="label">
                                <span>名称：</span>
                                <input value={shopName} onChange={this.handleOnChangeProperty.bind(this,uId, index, "shopName")}/>
                            </div>
                        </div>
                        <div className="wrap">
                            <div  className="sm"><span>单价：</span>
                                <input value={unitPrice}
                                    onChange={this.handleOnChangeProperty.bind(this,uId,index, "unitPrice")} /></div>
                            <div className="sm"><span>单位：</span>
                                <input value={unitName}
                                    onChange={this.handleOnChangeProperty.bind(this,uId, index, "unitName")} /></div>
                        </div>
                        <div className="wrap">
                            <div className="sm"><span>币种：</span>
                                <select value={currency} onChange={this.handleOnChangeProperty.bind(this,uId,index, "currency")}>
                                    <option value="￥">人民币</option>
                                    <option value="$">美元</option>
                                    <option value="£">英镑</option>
                                    <option value="€">欧元</option>
                                </select>
                            </div>
                            {
                                currency == "￥" ? null :
                                    <div className="sm"><span>汇率：</span>
                                        <input value={rate}
                                               onChange={this.handleOnChangeProperty.bind(this,uId, index, "rate")} />
                                    </div>
                            }
                        </div>
                        <div className="wrap">
                            <div className="md"><span className="vt">描述：</span>
                                <textarea value={description} onChange={this.handleOnChangeProperty.bind(this,uId, index, "description")}>
                                </textarea></div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div
                onClick={this.handleOnClickItem.bind(this, uId, index)}
                className = "ComShopPropertyItemBox">
                <div className={"normal " + (index==0?"top":"")}>
                    <div className="label">
                        <p>{shopName}</p>
                    </div>
                    <div className="btnS">
                        <a className="icononly-add iconfont" title="添加一个新的选择项"
                           onClick={this.handleOnClick.bind(this, uId, index,"copy")}
                        >&#xe60b;</a>
                        <a className="icononly-del iconfont" title="删除此选择项"
                           onClick={this.handleOnClick.bind(this, uId, index,"delete")}
                        >&#xe619;</a>
                    </div>
                </div>
            </div>
        )
    }
}
function mapShopPropertyItemStateToProps(state,props) {
    let shop = props.componentPoint;
    return {
        withImage:props.withImage || false,
        select:shop.select || false,
        uId:props.uId,
        index:props.index,
        src:shop.src||"",
        shopName:shop.shopName,
        rate: shop.rate,
        description:shop.description,
        unitPrice:shop.unitPrice,
        currency :shop.currency,
        unitName:shop.unitName
    };
}
function mapShopPropertyItemDispatchToProps(dispatch) {
    return {
        handleOnChangeProperty: (uId, index, params, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                com:"ComShopPropertyBox",
                params:params,
                index:index,
                value:value
            });
        },
        handleOnClickItem: (uId, index) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                com:"ComShopPropertyBox",
                params:"select_item",
                value:index
            });
        }
    };
}
const ConnectedComShopPropertyItemBox = connect(
    mapShopPropertyItemStateToProps,
    mapShopPropertyItemDispatchToProps)(ComShopPropertyItemBox);
export class ComShopPropertyBox extends Component {
    handleOnChangeProperty = (e) =>{
        const { uId, handleOnChangeProperty} = this.props ;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChangeProperty(uId, "withImage", e.target.checked);
    };
    render() {
        const { label , tip, shopList, uId, withImage} = this.props ;
        //console.log("shopList");
       // console.log(shopList);
        return (
            <div className = "ComShopPropertyBox ">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                <div className="imageCheck">
                    <input type="checkbox" checked={withImage} onChange={this.handleOnChangeProperty.bind(this)}/>显示图片
                </div>
                {
                    shopList.map((shop, index)=>{
                        return (<ConnectedComShopPropertyItemBox
                            index={index} uId={uId} withImage={withImage}
                            key={index} componentPoint={shop}/>);
                    })
                }
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        withImage:componentPoint.withImage||false,
        label:componentPoint.label||"",
        tip:componentPoint.tip||null,
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        shopList:componentPoint.shopList||[]
    };
}
function mapDispatchToProps(dispatch) {
    return {
        handleOnChangeProperty: (uId, params, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                com:"ComShopPropertyBox",
                params:params,
                value:value
            });
        }
    };
}
const ConnectedComShopPropertyBox = connect(mapStateToProps, mapDispatchToProps)(ComShopPropertyBox);
export default ConnectedComShopPropertyBox