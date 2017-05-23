/**
 * Created by lyy on 2017/1/10.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './AddressBox.less';

export class ComAddressBox extends Component {
    handleOnChange = (uId, param, e) => {
        const { handleOnChange } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChange(uId, param, e.target.value);
    };
    render() {
        const { uId, label , address, description, require, validated,
            provOptions, provValue,
            cityOptions, cityValue,
            areaOptions, areaValue} = this.props ;
        return (
            <div className = "ComAddressBox ">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    require  ? <p className="red">*</p> :null
                }
                <span className="validated">{validated}</span>
                <div className="description">{description}</div>
                <div>
                    <select value={provValue} onChange={this.handleOnChange.bind(this, uId, "prov")}>
                        <option value={"省/自治区/直辖市"}>{"省/自治区/直辖市"}</option>
                        {
                            provOptions.map((prov,index)=>{
                                return (<option key={index} value={prov}>{prov}</option>)
                            })
                        }
                    </select>
                    <select value={cityValue} onChange={this.handleOnChange.bind(this, uId, "city")}>
                        <option value={"市"}>{"市"}</option>
                        {
                            cityOptions.map((city,index)=>{
                                return (<option key={index} value={city}>{city}</option>)
                            })
                        }
                    </select>
                    <select value={areaValue} onChange={this.handleOnChange.bind(this, uId, "area")}>
                        <option value={"区"}>{"区"}</option>
                        {
                            areaOptions.map((area,index)=>{
                                return (<option key={index} value={area}>{area}</option>)
                            })
                        }
                    </select>
                </div>
                <textarea value={address} placeholder="详细地址"
                          onChange={this.handleOnChange.bind(this, uId, "address")}></textarea>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        label:componentPoint.label||"",
        provOptions:componentPoint.provOptions||"",
        provValue:componentPoint.provValue||"",
        cityOptions:componentPoint.cityOptions||"",
        cityValue:componentPoint.cityValue||"",
        areaOptions:componentPoint.areaOptions||"",
        areaValue:componentPoint.areaValue||"",
        description:componentPoint.description||"",
        require:componentPoint.require||false,
        address:componentPoint.address||"",
        validated:componentPoint.validated == null ? null:componentPoint.validated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleOnChange: (uId, param, value) => {
            dispatch({
                type: 'Update_ComObject',
                com:"ComAddressBox",
                uId: uId,
                param: param,
                value:value
            });
        }
    };
}
const ConnectedComAddressBox = connect(mapStateToProps, mapDispatchToProps)(ComAddressBox);
export default ConnectedComAddressBox