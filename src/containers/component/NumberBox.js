/**
 * Created by lyy on 2017/1/11.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './TextBox.less';

export class ComNumberBox extends Component {
    handleOnChange = (uId, e) => {
        const { handleOnChange, validated } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (isNaN(e.target.value)){
            return ;
        }
        handleOnChange(uId, e.target.value);
    };
    render() {
        const { label , value, tip, uId, length, name,
            require, validated, description} = this.props ;
        let styleLength = "ComWidthM";
        if (length == "s"){
            styleLength = "ComWidthS";
        }
        else if (length == "l"){
            styleLength = "ComWidthXXL";
        }
        return (
            <div className = "ComTextBox ">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    require  ? <p className="red">*</p> :null
                }
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                <span className="validated">{validated}</span>
                <div className="description">{description}</div>
                <input name = {name} className = {styleLength} value={value} onChange={this.handleOnChange.bind(this, uId)}/>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        label:componentPoint.label||"",
        value : componentPoint.value||"",
        tip:componentPoint.tip||null,
        length:componentPoint.length||"m",
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
const ConnectedComNumberBox = connect(mapStateToProps, mapDispatchToProps)(ComNumberBox);
export default ConnectedComNumberBox