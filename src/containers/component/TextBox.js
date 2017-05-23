/**
 * Created by lyy on 2016/12/30.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './TextBox.less';

export class ComTextBox extends Component {
    handleOnChange = (uId, e) => {
        const { handleOnChange, validated } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (validated == "number"){
            if (isNaN(e.target.value)){
                return ;
            }
        }
        handleOnChange(uId, e.target.value);
    };
    render() {
        const { label , value, tip, uId, length, name, description, require, hidden, validated} = this.props ;
        let styleLength = "ComWidthM";
        if (length == "s"){
            styleLength = "ComWidthS";
        }
        else if (length == "xxl"){
            styleLength = "ComWidthXXL";
        }
        return (
            <div className = "ComTextBox " style={{display:hidden == true ? "none":""}}>
                <p className={label==""?"hide":"ComTitle"}>
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
                <input type={hidden == true ? "hidden":"text"} name = {name} className = {styleLength} value={value} onChange={this.handleOnChange.bind(this, uId)}/>
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
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        name:componentPoint.uId == null ? null : componentPoint.uId,
        description:componentPoint.description||"",
        require:componentPoint.require||false,
        hidden:componentPoint.hidden||false,
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
const ConnectedComTextBox = connect(mapStateToProps, mapDispatchToProps)(ComTextBox);
export default ConnectedComTextBox