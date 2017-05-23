/**
 * Created by lyy on 2016/12/30.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './NameBox.less';

export class ComNameBox extends Component {
    handleOnChange = (uId, index, e) => {
        const { handleOnChange, validated } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChange(uId, index, e.target.value);
    };
    render() {
        const { label , value, valueOption, tip, uId, length, name, description, require, validated} = this.props ;
        let styleLength = "ComWidthM";
        if (length == "普通"){
            return (
                <div className = "ComNameBox ">
                    <p className={label==""?"hide":""}>
                        {label}
                    </p>
                    {
                        require  ? <p className="red">*</p> :null
                    }
                    <span className="validated">{validated}</span>
                    {
                        tip == null ? null :  <ComTip text={tip}/>
                    }
                    <div className="description">{description}</div>
                    <input className="ComWidthS" value={valueOption[0]} 
                           onChange={this.handleOnChange.bind(this, uId, 0)}/>
                </div>
            )
        }
        else {
            return (
                <div className = "ComNameBox ">
                    <p className={label==""?"hide":""}>
                        {label}
                    </p>
                    {
                        require  ? <p className="red">*</p> :null
                    }
                    <span className="validated">{validated}</span>
                    {
                        tip == null ? null :  <ComTip text={tip}/>
                    }
                    <div className="description">{description}</div>
                    <div className="nameWarp ComWidthSS">
                        <input value={valueOption[0]} onChange={this.handleOnChange.bind(this, uId, 0)}/>
                        <p>姓</p>
                    </div>
                    <p className="nameSep">-</p>
                    <div className="nameWarp ComWidthM">
                        <input  value={valueOption[1]} onChange={this.handleOnChange.bind(this, uId, 1)}/>
                        <p>名</p>
                    </div>
                    <p className="nameSep">-</p>
                    <div className="nameWarp ComWidthSS">
                        <input  value={valueOption[2]} onChange={this.handleOnChange.bind(this, uId, 2)}/>
                        <p>称呼</p>
                    </div>
                </div>
            )
        }

    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        label:componentPoint.label||"",
        value : componentPoint.value||"",
        valueOption : componentPoint.valueOption||["","",""],
        tip:componentPoint.tip||null,
        length:componentPoint.length||"m",
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        name:componentPoint.uId == null ? null : componentPoint.uId,
        description:componentPoint.description||"",
        require:componentPoint.require||false,
        validated:componentPoint.validated == null ? null:componentPoint.validated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleOnChange: (uId, index, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                index: index,
                value:value
            });
        }
    };
}
const ConnectedComNameBox = connect(mapStateToProps, mapDispatchToProps)(ComNameBox);
export default ConnectedComNameBox