/**
 * Created by lyy on 2017/1/10.
 */
/**
 * Created by lyy on 2017/1/3.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './PropertyMultipleCheckBox.less';

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
    handleOnChangeValue = (e) =>{
        const { handleOnChangeValue,index, uId } = this.props;
        console.log(e.value);
        console.log(e.target.value);
        handleOnChangeValue(uId, index, e.target.value);
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
            id:"PropertyMultipleCheckBoxList",
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
    render() {
        const { value, uId,index } = this.props ;
        return (
            <li className="ComCheckBox">
                <div className="ComCheckBoxMain">
                    <input value={value} type="text"
                           onChange={this.handleOnChangeValue.bind(this)}/>
                    <a className="icononly-add iconfont" title="添加一个新的选择项"
                       onClick={this.handleCopyItem.bind(this, uId, index)}
                    >&#xe60b;</a>
                    <a className="icononly-del iconfont" title="删除此选择项"
                       onClick={this.handleDeleteItem.bind(this, uId, index)}
                    >&#xe619;</a>
                    <a className="iconMov iconfont" title="排序"
                       onMouseDown={this.handleStartChangeListItem.bind(this, uId, index)}
                    >&#xe63d;</a>
                </div>
            </li>
        )
    }
}
function mapComCheckBoxDispatchToProps(dispatch) {
    return {
        Delete_PropertySelectItem:  (uId, index) => {
            dispatch({
                type: 'Delete_PropertyCheckListItem',
                uId: uId,
                value:index
            });
        },
        //复制
        Copy_PropertySelectItem:  (uId, index) => {
            dispatch({
                type: 'Copy_PropertyCheckListItem',
                uId: uId,
                value:index
            });
        },
        //修改选项
        handleOnChangeValue: (uId, index, value) => {
            dispatch({
                type: 'Update_PropertyCheckListItem',
                uId: uId,
                index:index,
                value:value
            });
        },
    };
}
function mapComCheckBoxStateToProps(state,props) {
    let config = props.config;
    // console.log(config);
    return {
        index:props.index||0,
        uId:props.uId||null,
        value:config.value||""
    };
}
const ConnectedComCheckBox = connect(mapComCheckBoxStateToProps, mapComCheckBoxDispatchToProps)(ComCheckBox);
export class ComPropertyMultipleCheckBox extends Component {
    render() {
        const { label , options, tip, uId, selectType,
            withImage, needCheckBox} = this.props ;
        return (
            <div className = "PropertyMultipleCheckBox">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                <ul id="PropertyMultipleCheckBoxList">
                    {
                        options.map((option, index)=>{
                            return (
                                <ConnectedComCheckBox key={index}
                                                      index={index}
                                                      config={option}
                                                      uId={uId}/>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        label:componentPoint.label||"",
        options: componentPoint.options||[],//选项
        tip:componentPoint.tip||null,
        uId:componentPoint.uId == null ? null : componentPoint.uId
    };
}
function mapDispatchToProps(dispatch) {
    return {
    };
}
const ConnectedComPropertyMultipleCheckBox = connect(mapStateToProps, mapDispatchToProps)(ComPropertyMultipleCheckBox);
export default ConnectedComPropertyMultipleCheckBox