/**
 * Created by lyy on 2017/1/3.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import ComImageUploadComponent from './ImageUploadComponent'
import './PropertySelectBox.less';

/**
 * 编辑列表属性的组件
 * type: "ComPropertySelectBox",
 * label: "选择项",
 * uId: "settingOptions",
 * selectType:"radio",  单选框还是多选框
 * imageValue:false,
 * imageValueShow:false,
 * tip:"此属性用于指定有哪些选择项可以提供给用户选择。
 * 利用旁边的增加或删除按钮以增加或删除选择项。
 * 对于下拉框在没有指定默认选中项的情况下将自动选中第一项。",
 * options: [{times:5, cycle:"每天", showTimes:false, name:"选项1",value:"选项1",checked:true}]
 */
class ComCheckBox extends Component {

    handleOnChangeValue = (uId, index, e) =>{
        const { handleOnChangeValue } = this.props;
        handleOnChangeValue(uId, index, e.target.value);
    };
    handleOnChangeCycle=  (uId, index, e) =>{
        const { handleOnChangeCycle } = this.props;
        handleOnChangeCycle(uId, index, e.target.value);
    };
    handleOnChangeTimes = (uId, index, e) =>{
        const { handleOnChangeTimes } = this.props;
        handleOnChangeTimes(uId, index, e.target.value);
    };
    handleShowTimes = (uId, index) =>{
        const { handleOnChangeProperty, showTimes } = this.props;
        handleOnChangeProperty(uId, index, "showTimes", showTimes);
    };
    handleStartChangeListItem = (uId, index, e) =>{
        //移动位置
        let btnNum = e.button;
        if (btnNum!=0)//不是鼠标左键
        {
            return ;
        }
        window.lyyState.startChangeListItem = true;
        window.lyyState.Item = {
            index:index,
            uId:uId
        };
        return ;
    };
    handleCopyItem = (uId, index, e) =>{
        let btnNum = e.button;
        if (btnNum!=0)//不是鼠标左键
        {
            return ;
        }
        const { Copy_PropertySelectItem } = this.props;
        Copy_PropertySelectItem(uId, index);
    };
    handleDeleteItem = (uId, index, e) =>{
        let btnNum = e.button;
        if (btnNum!=0)//不是鼠标左键
        {
            return ;
        }
        const { Delete_PropertySelectItem } = this.props;
        Delete_PropertySelectItem(uId, index);
    };
    handleOnChangeCheck = (e) =>{
        const { handleOnChangeProperty , index, uId,
            isPropertyForComMultipleCheckBox, handleOnDispatcherMultipleCheckBox} = this.props;
        handleOnChangeProperty(uId, index, 'checked',  e.target.checked);
        console.log("isPropertyForComMultipleCheckBox " + isPropertyForComMultipleCheckBox);
        if (isPropertyForComMultipleCheckBox == true){
            handleOnDispatcherMultipleCheckBox(uId, index, e.target.checked);
        }
    };
    uploadImage=(src)=>{
        const { handleOnChangeProperty, handleOnChangeRadioOtherOptionImage, index, uId } = this.props ;
        if (index == "radioBoxOtherOption"){
            handleOnChangeRadioOtherOptionImage(uId, src);
        }
        else{
            handleOnChangeProperty(uId, index, "src", src);
        }
    };
    handleOnChangeProperty=(param, e)=>{
        const { handleOnChangeProperty, index, uId } = this.props ;
        handleOnChangeProperty(uId, index, param, e.target.value);
    };
    render() {
        const { showTimes, tip, cycle, value, uId, withImage, src, times,
            selectType, index, checked } = this.props ;
        if (index == "radioBoxOtherOption"){
            return (
                <li className="ComCheckBox">
                    <div className="ComCheckBoxMain">
                        <input className={selectType} value={index} name={"ComCheckBoxRadio" + uId} type={selectType}
                               checked={checked} disabled="disabled"/>
                        {
                            withImage == true ?
                                <div className="image vc">
                                    <ComImageUploadComponent
                                        finishUpload={this.uploadImage}
                                        picker={"ComCheckBox-" + uId + "-" + index}
                                        src={src}/>
                                </div>
                                : null
                        }
                        <input value={value} type="text" disabled="disabled"/>
                    </div>
                </li>
            )
        }
        else {
            return (
                <li className="ComCheckBox">
                    <div className="ComCheckBoxMain">
                        <input className={selectType} value={index} name={"ComCheckBoxRadio" + uId} type={selectType}
                               checked={checked}
                               onChange={this.handleOnChangeCheck.bind(this)}/>
                        {
                            withImage == true ?
                                <div className="image vc">
                                    <ComImageUploadComponent
                                        finishUpload={this.uploadImage}
                                        picker={"ComCheckBox-" + uId + "-" + index}
                                        src={src}/>
                                </div>
                                : null
                        }
                        <input value={value} type="text"
                               onChange={this.handleOnChangeProperty.bind(this, "value")}/>

                        <a className="icononly-add iconfont" title="添加一个新的选择项"
                           onClick={this.handleCopyItem.bind(this, uId, index)}
                        >&#xe60b;</a>
                        <a className="icononly-del iconfont" title="删除此选择项"
                           onClick={this.handleDeleteItem.bind(this, uId, index)}
                        >&#xe619;</a>
                        <a className="iconMov iconfont" title="排序"
                           onMouseDown={this.handleStartChangeListItem.bind(this, uId, index)}
                        >&#xe63d;</a>
                        <a className="icononly-limit iconfont" title="添加提交次数限制"
                           onClick={this.handleShowTimes.bind(this, uId, index)}
                        >&#xe632;</a>
                    </div>
                    <div className={showTimes == false ? "hide" : "showTimes"} style={{"marginTop": "5px"}}>
                        <select className="s" style={{marginLeft: "18px"}} value={cycle}
                                onChange={this.handleOnChangeCycle.bind(this, uId, index)}>
                            <option value="每天">每天</option>
                            <option value="累计">累计</option>
                        </select>
                        <span>限制填写</span>

                        <input className="s number limithelp" type="text" maxLength="10"
                               value={times}
                               onChange={this.handleOnChangeTimes.bind(this, uId, index)}/> 次
                        <ComTip text={"超出数量不可以选择，0为没有上限"}/>
                    </div>
                </li>
            )
        }
    }
}
function mapComCheckBoxDispatchToProps(dispatch) {
    return {
        handleOnChangeRadioOtherOptionImage:(uId, src) => {
            dispatch({
                type: 'Update_RadioOtherOptionSelectImage',
                uId:uId,
                value:src
            });
        },
        handleOnDispatcherMultipleCheckBox: (uId, index, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                index:index,
                value:value
            });
        },
        handleOnChangeProperty: (uId, index, params, value) => {
            dispatch({
                type: 'Update_PropertySelectList',
                uId: uId,
                com:"ComPropertySelectBox",
                index:index,
                params:params,
                value:value
            });
        },
        Delete_PropertySelectItem:  (uId, index) => {
            dispatch({
                type: 'Delete_PropertySelectItem',
                uId: uId,
                value:index
            });
        },
        //复制
        Copy_PropertySelectItem:  (uId, index) => {
            dispatch({
                type: 'Copy_PropertySelectItem',
                uId: uId,
                value:index
            });
        },
        //显示频率字段
        handleShowTimes: (uId, index) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                value:{
                    name:"showTimes",
                    value:{
                        index:index
                    }
                }
            });
        },
        //修改选项
        handleOnChangeValue: (uId, index, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                value:{
                    name:"updateOptionValue",
                    value:{
                        index:index,
                        value:value
                    }
                }
            });
        },

        //修改选项选中计算频率  每天or累计
        handleOnChangeCycle: (uId, index, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                value:{
                    name:"cycle",
                    value:{
                        index:index,
                        value:value
                    }
                }
            });
        },
        //修改选项选中计算次数
        handleOnChangeTimes: (uId, index, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                value:{
                    name:"times",
                    value:{
                        index:index,
                        value:value
                    }
                }
            });
        }
    };
}
function mapComCheckBoxStateToProps(state,props) {
    let config = props.config;
   // console.log(config);
    return {
        index:props.index||0,
        uId:props.uId||null,
        selectType:props.selectType||"checkbox",
        tip:config.tip||null,
        showTimes:config.showTimes||false,
        cycle:config.cycle||"每天",
        value:config.value || "",
        times:config.times||0,
        checked:config.checked||false,
        withImage:props.withImage,
        src:config.src||"",
        isPropertyForComMultipleCheckBox:props.isPropertyForComMultipleCheckBox,
    };
}
const ConnectedComCheckBox = connect(mapComCheckBoxStateToProps, mapComCheckBoxDispatchToProps)(ComCheckBox);
export class ComPropertySelectBox extends Component {
    handleOnChangeProperty = (e) =>{
        const { uId, handleOnChangeProperty} = this.props ;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChangeProperty(uId, "withImage", e.target.checked);
    };
    render() {
        const { label , options, tip, uId, selectType,isPropertyForComMultipleCheckBox,
            showOtherOption, showOtherOptionImage ,
            withImage, needCheckBox} = this.props ;
        let otherConfig = {
            times:0, cycle:"每天", showTimes:false, name:"其他",value:"其他",checked:false,
            src:showOtherOptionImage
        }
        return (
            <div className = "PropertySelectBox">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                {
                    //是否提供选择图片选项
                    needCheckBox == true ?
                        <div className="imageCheck">
                            <input type="checkbox" checked={withImage} onChange={this.handleOnChangeProperty.bind(this)}/>显示图片
                        </div>
                        :null
                }
                <ul id="propertySelectBoxList">
                    {
                        options.map((option, index)=>{
                            return (
                                <ConnectedComCheckBox key={index}
                                                      isPropertyForComMultipleCheckBox = {isPropertyForComMultipleCheckBox}
                                                      index={index}
                                                      withImage={withImage}
                                                      selectType={selectType}
                                                      config={option}
                                                      uId={uId}/>
                            )
                        })
                    }
                    {
                        showOtherOption == true ?
                            <ConnectedComCheckBox isPropertyForComMultipleCheckBox = {isPropertyForComMultipleCheckBox}
                                                  index={'radioBoxOtherOption'}
                                                  withImage={withImage}
                                                  selectType={selectType}
                                                  config={otherConfig}
                                                  uId={uId}/>
                            :
                            null
                    }
                </ul>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        isPropertyForComMultipleCheckBox:componentPoint.isPropertyForComMultipleCheckBox||false,
        selectType:componentPoint.selectType||"checkbox",
        showOtherOption:componentPoint.showOtherOption||false, //单选框其他选择图片上传
        showOtherOptionImage:componentPoint.showOtherOptionImage||"",
        label:componentPoint.label||"",
        withImage : componentPoint.withImage, //true选中，false不选中
        needCheckBox : componentPoint.needCheckBox, //是否提供选择图片选项
        options: componentPoint.options||[],//选项
        tip:componentPoint.tip||null,
        uId:componentPoint.uId == null ? null : componentPoint.uId
    };
}
function mapDispatchToProps(dispatch) {
    return {
        handleOnChangeProperty: (uId, params, value) => {
            dispatch({
                type: 'Update_PropertySelectList',
                uId: uId,
                com:"ComPropertySelectBox",
                params:params,
                value:value
            });
        }
    };
}
const ConnectedComPropertySelectBox = connect(mapStateToProps, mapDispatchToProps)(ComPropertySelectBox);
export default ConnectedComPropertySelectBox