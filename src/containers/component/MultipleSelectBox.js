/**
 * Created by lyy on 2017/1/10.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './MultipleSelectBox.less';

export class ComMultipleSelectSingle extends Component {
    handleOnChange = (uId, index, e)=>{
        const { handleOnChange } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChange(uId, index, e.target.value);
    };
    render() {
        const {value, options, uId, index} = this.props;
        return(
            <div className = "ComMultipleSelectSingle">
                <select value={value} onChange={this.handleOnChange.bind(this, uId, index)}>
                    <option value="">请选择</option>
                    {
                        options.map((option, index)=>{
                            return <option key={index} value={option}>{option.replace(/^-+/g,"")}</option>
                        })
                    }
                </select>
            </div>
        );
    }
}
function mapItemStateToProps(state,props) {
    let config = props.config;
    return {
        value:config.value||"",
        options : config.options||[],
        uId:props.uId == null ? null : props.uId,
        index:props.index == null ? null : props.index
    };
}
function mapItemDispatchToProps(dispatch) {
    return {
        handleOnChange: (uId, index, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                index:index,
                value:value
            });
        }
    };
}
const ConnectedComMultipleSelectSingle = connect(mapItemStateToProps, mapItemDispatchToProps)(ComMultipleSelectSingle);
export class ComMultipleSelectBox extends Component {
    handleOnChange = (uId, e) => {
        const { handleOnChange } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChange(uId, e.target.value);
    };
    render() {
        const { label , value, configList, uId, selectNum,
            require, validated, description} = this.props ;
        let styleLength = "ComWidthM";
        if (selectNum == 2){
            styleLength = "ComWidthL";
        }
        else if (selectNum == 3){
            styleLength = "ComWidthM";
        }
        else if (selectNum == 4){
            styleLength = "ComWidthS";
        }
        return (
            <div className = "ComMultipleSelectBox">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    require  ? <p className="red">*</p> :null
                }
                <span className="validated">{validated}</span>
                <div className="description">{description}</div>
                <div className={styleLength}>
                    {
                        configList.map((itemConfig, index)=>{
                            return(
                                <ConnectedComMultipleSelectSingle
                                    key={index} index={index} uId={uId}
                                    config={itemConfig}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    // console.log("下拉框选项");
    // console.log(componentPoint.options);
    return {
        description:componentPoint.description||"",
        label:componentPoint.label||"",
        value:componentPoint.value||"",
        configList : componentPoint.configList||[],
        selectNum: componentPoint.selectNum||"2",
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        require:componentPoint.require||false,
        validated:componentPoint.validated == null ? null:componentPoint.validated
    };
}
const ConnectedComMultipleSelectBox = connect(mapStateToProps)(ComMultipleSelectBox);
export default ConnectedComMultipleSelectBox