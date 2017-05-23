/**
 * Created by lyy on 2017/1/10.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import './LoactionBox.less';

export class ComLocationBox extends Component {
    handleOnChange = (uId, e) => {
        const { handleOnChange} = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleOnChange(uId, e.target.value);
    };
    componentDidMount(){
        const { handleOnChange, uId } = this.props;
        if(window.lyyRender=="form") {
            var map = new BMap.Map("locationContainer");          // 创建地图实例
            var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            function myFun(result){
                var cityName = result.name;
                map.setCenter(cityName);
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
            var geoc = new BMap.Geocoder();

            map.addEventListener("click", function(e){
                var pt = e.point;
                let address = "";
                geoc.getLocation(pt, function(rs){
                    address = rs.address ;
                    if (rs.surroundingPois.length > 0){
                        address = address + rs.surroundingPois[0].title;
                    }
                    handleOnChange(uId,address);
                });
                var allOverlay = map.getOverlays();
                for (var i = 0; i < allOverlay.length ; i++){
                    map.removeOverlay(allOverlay[i]);
                }
                var marker = new BMap.Marker(pt);// 创建标注
                map.addOverlay(marker);
            });
        }
    }
    render() {
        const { label , value, uId, require, validated, description} = this.props ;
        if(window.lyyRender=="form"){
            return (
                <div className = "ComLocationBox ">
                    <p className={label==""?"hide":""}>
                        {label}
                    </p>
                    {
                        require  ? <p className="red">*</p> :null
                    }
                    <span className="validated">{validated}</span>
                    <div className="description">{description}</div>
                    <input value={value} onChange={this.handleOnChange.bind(this,uId)}/>
                    <div id="locationContainer"></div>
                </div>
            )
        }
        return (
            <div className = "ComLocationBox ">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                <div className="description">{description}</div>
                <input/>
                <img src={window.formBuildState.ImageLocation + "/map.jpg"}/>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        label:componentPoint.label||"",
        value:componentPoint.value||"",
        description:componentPoint.description||"",
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        name:componentPoint.uId == null ? null : componentPoint.uId,
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
const ConnectedComLocationBox = connect(mapStateToProps, mapDispatchToProps)(ComLocationBox);
export default ConnectedComLocationBox