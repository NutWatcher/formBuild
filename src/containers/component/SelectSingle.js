/**
 * Created by lyy on 2016/12/31.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './SelectSingle.less';

export class ComSelectSingle extends Component {
    handleOnChange = (uId, e) => {
        const { handleOnChange } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChange(uId, e.target.value);
    };
    render() {
        const { label , value, tip, options, uId, length, name,
            require , validated , description} = this.props ;
        let styleLength = "ComWidthM";
        if (length == "s"){
            styleLength = "ComWidthS";
        }
        else if (length == "xxl"){
            styleLength = "ComWidthXXL";
        }
        return (
            <div className = "ComSelectSingle">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip Com="textBox"/>
                }
                {
                    require  ? <p className="red">*</p> :null
                }
                <span className="validated">{validated}</span>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                <div className="description">{description}</div>
                <select value={value} name = {name}  className = {styleLength} onChange={this.handleOnChange.bind(this, uId)}>
                    <option value=" ">请选择</option>
                    {
                        options.map((option, index)=>{
                            return <option key={index} value={option.value}>{option.name}</option>
                        })
                    }
                </select>

            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
   // console.log("下拉框选项");
   // console.log(componentPoint.options);
    return {
        label:componentPoint.label||"",
        value:componentPoint.value||"",
        options : componentPoint.options||[],
        length:componentPoint.length||"m",
        tip:componentPoint.tip||null,
        description:componentPoint.description||"",
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        name:componentPoint.uId == null ? null : componentPoint.uId,
        require:componentPoint.require||false,
        validated:componentPoint.validated == null ? null:componentPoint.validated
    };
}
function mapDispatchToProps(dispatch) {
    return {
        handleOnChange: (uId, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                value:value
            });
        }
    };
}
const ConnectedComSelectSingle = connect(mapStateToProps, mapDispatchToProps)(ComSelectSingle);
export default ConnectedComSelectSingle