/**
 * Created by lyy on 2016/12/30.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import './Tip.less';

export class ComTip extends Component {
    render() {
        const { label } = this.props ;
        return (
            <div className = "ComTip">
                <a data-tip={label}> (?) </a>
                <ReactTooltip class='tipClass' place="left" data-border="true" type="dark" effect="solid" />

            </div>
        )
    }
}
function mapStateToProps(state,props) {
    return {label:props.text||"没有提示"};
}
const ConnectedComTip = connect(mapStateToProps)(ComTip);
export default ConnectedComTip