/**
 * Created by lyy on 2017/1/3.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import  ComTextBox from './TextBox'
import './TextBox.less';

/**
 * 用于输入组件 最小长度-最大长度
 * 数值型字段用于限定数值的范围；文本型字段用于限定字数的多少。
 */
export class ComRangeTextBox extends Component {
    handleOnChange = (uId, e) => {
        const { handleOnChange } = this.props;
        //console.log(e.target.value);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChange(uId, e.target.value);
    };
    render() {
        const { label , value, tip, uId, length, name} = this.props ;
        let styleLength = "ComWidthM";
        if (length == "s"){
            styleLength = "ComWidthS";
        }
        else if (length == "xxl"){
            styleLength = "ComWidthXXL";
        }
        return (
            <div className = "ComRangeTextBox ">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                <div>
                    <ComTextBox />
                    <ComTextBox />
                </div>
                <input name = {name} className = {styleLength} value={value} onChange={this.handleOnChange.bind(this, uId)}/>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    //console.log(componentPoint);
    return {
        label:componentPoint.label||"",
        value : componentPoint.value||"",
        tip:componentPoint.tip||null,
        uId:componentPoint.uId||null,
        length:componentPoint.length||"m",
        name:componentPoint.name||""
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
const ConnectedComRangeTextBox = connect(mapStateToProps, mapDispatchToProps)(ComRangeTextBox);
export default ConnectedComRangeTextBox