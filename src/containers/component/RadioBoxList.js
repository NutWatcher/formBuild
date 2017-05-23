/**
 * Created by lyy on 2017/1/2.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './CheckBoxList.less';


class ComRadioBox extends Component {
    handleOnClick = (uId, name, e) =>{
        const { handleOnClick, handleOnChangeOtherValue, other, index } = this.props;
        console.log("e.target.checked");
        console.log(e.target.checked);
        if (other == true){
            handleOnChangeOtherValue(uId, 'otherChecked', e.target.checked);
        }
        else {
            handleOnClick(uId, name, e.target.checked , index);
        }
    };
    handleOnChangeOtherValue = (uId, name, e) =>{
        const { handleOnChangeOtherValue } = this.props;
        handleOnChangeOtherValue(uId, 'otherValue', e.target.value);
    };
    render() {
        const { label, tip, uId, withImage, src, length, other, otherValue, otherChecked } = this.props ;
        let {name, value} = this.props ;
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
        if (other == true){
            name = otherValue;
            value = otherChecked;
        }
        console.log("rerender radio item")
        if (withImage == true){
            return (
                <div className="ComCheckBoxWithImage ">
                    <img src={src}/>
                    <div>
                        <input name = {name} checked={value==true?true:false} type="radio" onChange={this.handleOnClick.bind(this, uId, name)}/>
                        {
                            other == true ? <label>其他 </label> : <label>{name}</label>
                        }
                        {
                            other == true ? <input className="otherInput"   value={otherValue.replace('其他:',"")}
                                                   onChange={this.handleOnChangeOtherValue.bind(this, uId, name)}
                                /> : null
                        }
                        {
                            tip == null ? null :  <ComTip text={tip}/>
                        }
                    </div>

                </div>
            )
        }
        return (
            <div className={"ComCheckBox  " + style}>
                <input checked={value==true?true:false}  type="radio" onChange={this.handleOnClick.bind(this, uId, name)}/>
                {
                    other == true ? <label>其他 </label> : <label>{name}</label>
                }
                {
                    other == true ? <input className="otherInput"  value={otherValue.replace('其他:',"")}
                                           onChange={this.handleOnChangeOtherValue.bind(this, uId, name)}
                        /> : null
                }
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
            </div>
            )
    }
}
function mapComRadioBoxDispatchToProps(dispatch) {
    return {
        handleOnClick: (uId, name, value, index) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                value:{
                    name:name,
                    value:value,
                    index:index
                }
            });
        },
        handleOnChangeOtherValue: (uId, param, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                param: param,
                value: value
            });
        },
    };
}
function mapComRadioBoxStateToProps(state,props) {
    let config = props.config;

    //console.log(JSON.stringify(config));
    return {
        index:props.index||0,
        length:props.length||'l',
        withImage:props.withImage||false,
        label:config.label||"",
        tip:config.tip||null,
        other:config.other||false,
        otherValue :config.otherValue||"",
        otherChecked:config.otherChecked||false,
        value:config.checked||false,
        name:config.name,
        src:config.src||"",
        uId:props.uId||null
    };
}
const ConnectedComRadioBox = connect(mapComRadioBoxStateToProps, mapComRadioBoxDispatchToProps)(ComRadioBox);
export class ComRadioBoxList extends Component {
    render() {
        const { label , options, tip, uId , withImage, length, other, otherValue,otherChecked, otherImage, randomValue,
            require, validated, description} = this.props ;
        let tempOptions = JSON.parse(JSON.stringify(options));
        window.lyyRenderRadioBoxList = window.lyyRenderRadioBoxList || {};
        for (let i = 0 ; i < tempOptions.length ; i ++){
            tempOptions[i].tempIndex = i ;
        }
        if (randomValue == true && window.lyyRender=="form" && !window.lyyRenderRadioBoxList['uId']){
            window.lyyRenderRadioBoxList['uId'] = true;
            tempOptions.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
        }
        return (
            <div className = "ComCheckBoxList">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                {
                    require  ? <p className="red">*</p> :null
                }
                <span className="validated">{validated}</span>
                <div className="description">{description}</div>
                <div>
                    {
                        tempOptions.map((option, index)=>{
                            return (<ConnectedComRadioBox key={index} index={option.tempIndex} config={option} length={length}
                                                          uId={uId} withImage={withImage}/>)
                        })
                    }
                    {
                        other == true ?
                            <ConnectedComRadioBox config={{other:true,otherValue:otherValue,
                                src:otherImage,
                                otherChecked:otherChecked}} length={length}
                                                  uId={uId} withImage={withImage}/>
                            :null
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        label:componentPoint.label||"",
        length: componentPoint.length||'l',
        options: componentPoint.options||[],
        tip:componentPoint.tip||null,
        uId:componentPoint.uId||null,
        randomValue:componentPoint.randomValue||false,
        other:componentPoint.other||false,
        otherImage:componentPoint.otherImage||"",
        otherValue :componentPoint.otherValue||"",
        otherChecked:componentPoint.otherChecked||false,
        description:componentPoint.description||"",
        withImage:componentPoint.withImage||false,
        require:componentPoint.require||false,
        validated:componentPoint.validated == null ? null:componentPoint.validated
    };
}
const ConnectedComRadioBoxList = connect(mapStateToProps)(ComRadioBoxList);
export default ConnectedComRadioBoxList