/**
 * Created by lyy on 2017/1/7.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './TimeBox.less';

export class ComTimeBox extends Component {
    handleOnChange = (uId, type, e) => {
        const { handleOnChange, validated } = this.props;
        console.log("handleOnChange");
        console.log(uId);
        console.log(e.target.value);
        handleOnChange(uId, e.target.value, type);
    };
    render() {
        const { label , value, valueHour, valueMinute, tip, uId, name, description, require, validated} = this.props ;
        let hours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
        let minutes = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20",
            "21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42",
            "43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
        console.log(require);
        console.log("require");
        return (
            <div className = "ComTimeBox ">
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
                <div></div>
                <select className="mr3" value={valueHour} onChange={this.handleOnChange.bind(this,uId,"valueHour")}>
                    <option key={"select1"} value={" "}>请选择</option>
                    {
                        hours.map((hour, index)=>{
                            return (<option key={index} value={hour}>{hour}</option>);
                        })
                    }
                </select>
                :
                <select className="ml3" value={valueMinute} onChange={this.handleOnChange.bind(this,uId,"valueMinute")}>
                    <option key={"select2"} value={" "}>请选择</option>
                    {
                        minutes.map((minute, index)=>{
                            return (<option key={index} value={minute}>{minute}</option>);
                        })
                    }
                </select>
                <input className="hide" name = {name} defaultValue={value} />
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        label:componentPoint.label||"",
        value : componentPoint.value||"00:00",
        valueHour : componentPoint.valueHour||"00",
        valueMinute : componentPoint.valueMinute||"00",
        require:componentPoint.require||false,
        tip:componentPoint.tip||null,
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        name:componentPoint.uId == null ? null : componentPoint.uId,
        description:componentPoint.description||"",
        validated:componentPoint.validated||"",
        validated:componentPoint.validated == null ? null:componentPoint.validated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleOnChange: (uId, value, type) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                value:value,
                valueType:type
            });
        }
    };
}
const ConnectedComTimeBox = connect(mapStateToProps, mapDispatchToProps)(ComTimeBox);
export default ConnectedComTimeBox