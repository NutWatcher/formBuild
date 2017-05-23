/**
 * Created by lyy on 2017/1/2.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './htmlBox.less';

export class ComHtmlBox extends Component {
    render() {
        const { label , tip, value, separator} = this.props ;
        return (
            <div className = "ComHtmlBox">
                <p className={separator==""?"hide":"separator"}>
                </p>
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                <div dangerouslySetInnerHTML={{__html: value}}></div>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    //console.log(componentPoint.value);
    return {
        label:componentPoint.label||"",
        value:componentPoint.value||"",
        tip:componentPoint.tip||null,
        separator:componentPoint.separator||"",
        uId:componentPoint.uId||null
    };
}
const ConnectedComHtmlBox = connect(mapStateToProps)(ComHtmlBox);
export default ConnectedComHtmlBox