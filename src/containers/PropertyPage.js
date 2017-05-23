/**
 * Created by lyy on 2016/12/28.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComLayout from './component/Layout'
import './PropertyPage.less';

export class Property extends Component {
    componentDidUpdate(){
        const { refresh } = this.props;
        const { render_propertyPage } = this.props;
        if (refresh.refresh == true){
         //   console.log("refresh");
           // console.log(refresh);
            render_propertyPage(refresh.propertyComponents);
        }

    }
    render() {
        const {components} = this.props;
        //console.log("render propertyPage");
        //console.log(components);
        return(
            <div className = "PropertyContent">
                <h3 className="fields-group">表单属性</h3>
                <div className="layoutWrap">
                    {
                        components.map((component,index)=>{
                            return <ComLayout key={index} uName={"propertyLayout + " + index} components={component}/>
                        })
                    }
                </div>
                <div className="bottom"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let components = [];
    components = [[{name:"ComTextBox",attribute:{label:"label",defaultValue:"提示",tip:{}}},
            {name:"ComImageBox",attribute:{src:"http://imageimages.jsform.com/58665da00cf259e60ea70ba6.jpg"}}],
        [{name:"ComEditTextArea",attribute:{uId:"cc",property:{}}}],
        [{name:"ComTextAreaBox",attribute:{label:"label",defaultValue:"提示"}},
            {name:"ComSelectSingle",attribute:{label:"label",property:{defaultValue:"提示",options:["11","22","提示"]}}}]
    ];
    if (state.PropertyState ){
        components = state.PropertyState.propertyComponents
    }
   // console.log(components);
    return {
        components:components,
        refresh:state["MainState"]["propertyPageState"]
    };
}
const mapDispatchToProps = {
    render_propertyPage:(propertyComponents)=>(dispatch)=>{
        dispatch({
            type: 'Render_PropertyPage',
            propertyComponents:propertyComponents
        });
    }
};
const ConnectedProperty = connect(mapStateToProps, mapDispatchToProps)(Property);
export default ConnectedProperty