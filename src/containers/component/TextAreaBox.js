/**
 * Created by lyy on 2016/12/31.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './TextAreaBox.less';

export class ComTextAreaBox extends Component {
    handleOnChange = (uId, e) => {
        const { handleOnChange } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChange(uId, e.target.value);
    };
    render() {
        const { label , value, tip, uId, height,
            require, validated, description} = this.props ;
        let style = {height:60};
        if (height == 's'){
            style={height:60};
        }
        else if (height == 'm'){
            style={height:120};
        }
        else if (height == 'l'){
            style={height:180};
        }
        return (
            <div className = "ComTextAreaBox">
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
                <textarea value={value} style={style} onChange={this.handleOnChange.bind(this, uId)}/>

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
        uId:componentPoint.uId||null,
        description:componentPoint.description||"",
        height:componentPoint.height||"s",
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
const ConnectedComTextAreaBox = connect(mapStateToProps, mapDispatchToProps)(ComTextAreaBox);
export default ConnectedComTextAreaBox