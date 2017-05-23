/**
 * Created by lyy on 2016/12/30.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './ImageBox.less';

export class ComImageBox extends Component {
    onSelect = (e) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        return false ;
    };
    onDragStart = (e) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        return false ;
    };
    onSelect = (e) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        return false ;
    };
    render() {
        const { src, label , tip, name, description} = this.props ;
        return (
            <div className = "ComImageBox">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                <div className="description">{description}</div>
                <img name={name} src={src}
                     onDrag= {this.onDragStart}
                     onDragStart= {this.onDragStart}
                     onSelect= {this.onSelect}
                />
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        label:componentPoint.label||"",
        src:componentPoint.src||"",
        description:componentPoint.description||"",
        tip:componentPoint.tip||null,
        uId:componentPoint.uId||null,
        name:componentPoint.name||""
    };
}
const ConnectedComImageBox = connect(mapStateToProps)(ComImageBox);
export default ConnectedComImageBox