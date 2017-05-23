/**
 * Created by lyy on 2017/1/3.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
var DatePicker = require('react-datepicker');
import  * as Util from '../../actions/util';
import "react-datepicker/dist/react-datepicker.css";
var moment = require('moment');
import ComTip from './Tip'
import './DatePicker.less';
moment.locale('zh-cn');
var ExampleCustomInput = React.createClass({
    displayName: "ExampleCustomInput" ,

    propTypes: {
        onClick: React.PropTypes.func,
        value: React.PropTypes.string
    },

    render () {
        return (
            <button
                className="DatePickerButton"
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
})

export class ComDatePickerBox extends Component {
    handleOnChange = (value) => {
        const { uId, handleOnChange} = this.props;
        handleOnChange(uId, moment(value).format('YYYY-MM-DD'));
    };
    Phone_handleOnChange = (e) => {
        const { uId, handleOnChange} = this.props;
   //     console.log(e.target.value);
   //     console.log(moment(e.target.value).format('YYYY-MM-DD'));
        handleOnChange(uId, moment(e.target.value).format('YYYY-MM-DD'));
    };
    render() {
        const { label , value, tip, description, dataStyle} = this.props ;
        let date = value ;
        if (date == "today" || date==""){
            date = moment().format('YYYY-MM-DD');
        }
        else {
            try {
                date = moment(value,'YYYY-MM-DD').format('YYYY-MM-DD');
            }
            catch (e){
                date = moment().format('YYYY-MM-DD');
            }
        }
        if (date == 'Invalid date'){
            date = moment().format('YYYY-MM-DD');
        }
        if (Util.IsPC() == false){
            return (
                <div className = "DatePicker ">
                    <p className={label==""?"hide":""}>
                        {label}
                    </p>
                    {
                        tip == null ? null :  <ComTip text={tip}/>
                    }
                    <div className="description">{description}</div>
                    <div>
                        <input type="date" value={date} onChange={this.Phone_handleOnChange} />
                    </div>

                </div>
            )
        }
        return (
            <div className = "DatePicker ">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                <div className="description">{description}</div>
                <div>
                    <DatePicker
                        customInput={<ExampleCustomInput />}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        scrollableYearDropdown
                        dateFormat={dataStyle}
                        selected={moment(date)}
                        onChange={this.handleOnChange} />

                </div>

            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        label:componentPoint.label||"",
        dataStyle: componentPoint.dataStyle,
        value : componentPoint.value||moment().format('YYYY-MM-DD'),
        tip:componentPoint.tip||null,
        description:componentPoint.description||"",
        uId:componentPoint.uId == null ? null : componentPoint.uId
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
const ConnectedComDatePickerBox = connect(mapStateToProps, mapDispatchToProps)(ComDatePickerBox);
export default ConnectedComDatePickerBox