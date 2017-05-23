/**
 * Created by lyy on 2017/1/2.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './CheckBoxList.less';


class ComCheckBox extends Component {
    handleOnClick = (e) =>{
        const { handleOnClick, uId, matchKey } = this.props;
        //console.log(e.target.checked);
        handleOnClick(uId, matchKey, e.target.checked);
    };
    render() {
        const { tip, name, value, withImage, src, length } = this.props ;
        let style = "";
        if (length == 'l'){
            style = "itemL";
        }
        else if (length == 'm'){
            style = "itemM";
        }
        else if (length == 's'){
            style = "itemS";
        }
        else if (length == 'auto'){
            style = "itemAuto";
        }
        if (withImage == true){
            return (
                <div className="ComCheckBoxWithImage ">
                    <img src={src}/>
                    <div>
                        <input checked={value} type="checkbox" onChange={this.handleOnClick.bind(this)}/>
                        <label>{name}</label>
                        {
                            tip == null ? null :  <div className="ComCheckBoxTipWrap" ><ComTip text={tip}/></div>
                        }

                    </div>

                </div>
            )
        }
        return (
            <div className={"ComCheckBox  " + style + " responseBox"}>
                <input checked={value} type="checkbox" onChange={this.handleOnClick.bind(this)}/>
                <label>{name}</label>
                {
                    tip == null ? null :   <div className="ComCheckBoxTipWrap"><ComTip text={tip}/></div>
                }
            </div>
            )
    }
}
function mapComCheckBoxDispatchToProps(dispatch) {
    return {
        handleOnClick: (uId, matchKey, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                param:"checkBox",
                matchKey:matchKey,
                value:value
            });
        }
    };
}
function mapComCheckBoxStateToProps(state,props) {
    let config = props.config;
    //console.log(config);
    return {
        length:props.length||'l',
        withImage:props.withImage||false,
        matchKey:config.matchKey||config.name,
        tip:config.tip||null,
        value:config.checked||false,
        name:config.name,
        src:config.src||"",
        uId:props.uId||null
    };
}
const ConnectedComCheckBox = connect(mapComCheckBoxStateToProps, mapComCheckBoxDispatchToProps)(ComCheckBox);
export class ComCheckBoxList extends Component {
    render() {
        const { label , options, tip, uId , withImage, length,
            require, validated, description} = this.props ;
        return (
            <div className = "ComCheckBoxList">
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
                <div>
                    {
                        options.map((option, index)=>{
                            return (<ConnectedComCheckBox key={index} config={option} length={length}
                                                          uId={uId} withImage={withImage}/>)
                        })
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
   // console.log(componentPoint);
    return {
        description:componentPoint.description||"",
        label:componentPoint.label||"",
        length: componentPoint.length||'l',
        options: componentPoint.options||[],
        tip:componentPoint.tip||null,
        uId:componentPoint.uId||null,
        withImage:componentPoint.withImage||false,
        require:componentPoint.require||false,
        validated:componentPoint.validated == null ? null:componentPoint.validated
    };
}
const ConnectedComCheckBoxList = connect(mapStateToProps)(ComCheckBoxList);
export default ConnectedComCheckBoxList