/**
 * Created by lyy on 2016/12/30.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './TelephoneBox.less';

export class ComTelephoneBox extends Component {
    handleOnChange = (uId, index, e) => {
        const { handleOnChange, validated } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        console.log(e.target.value);
        if (isNaN(e.target.value.replace(/-/g,''))){
            return ;
        }
        handleOnChange(uId, index, e.target.value);
    };
    render() {
        const { label , value, valueOption, tip, uId,
            showType, length, name, description, require, validated} = this.props ;
     //   console.log("render tel");
     //   console.log(showType);
        if (showType == "手机"){
            return (
                <div className = "ComTelephoneBox ">
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
                    <input className="ComWidthS" value={value}
                           onChange={this.handleOnChange.bind(this, uId, 0)}/>
                </div>
            )
        }
        else {
            let wrapClass = "";
            if(length == 'l'){
                wrapClass = "telL";
            }
            else if(length == 'm'){
                wrapClass = "telM";
            }
            return (
                <div className = "ComTelephoneBox ">
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
                    <div className={"telItemWrap " + wrapClass}>
                        <div className="nameWarp ComWidthSS">
                            <input value={valueOption[0]} onChange={this.handleOnChange.bind(this, uId, 0)}/>
                            <p>区号</p>
                        </div>
                        <p className="nameSep">-</p>
                        <div className="nameWarp ComWidthM">
                            <input  value={valueOption[1]} onChange={this.handleOnChange.bind(this, uId, 1)}/>
                            <p>总机</p>
                        </div>
                        <p className="nameSep">-</p>
                        <div className="nameWarp ComWidthSS">
                            <input  value={valueOption[2]} onChange={this.handleOnChange.bind(this, uId, 2)}/>
                            <p>分机</p>
                        </div>
                    </div>

                </div>
            )
        }

    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        showType:componentPoint.showType||"普通",
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
const ConnectedComTelephoneBox = connect(mapStateToProps, mapDispatchToProps)(ComTelephoneBox);
export default ConnectedComTelephoneBox