/**
 * Created by lyy on 2016/12/28.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import './ComponentPage.less';

export class ComponentContentFieldList extends Component {
    handleSelect = (text, icon, e) => {
        const { handleSelect } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleSelect(text, icon);
    };
    handleMouseUp = (e) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };
    handleMouseMove= (select,e) => {
        const { handleMouseMove } = this.props;
        if (select == false){
            return ;
        }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleMouseMove();
    };
    handleMouseDown = (text, icon, e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        window.lyyState.startComponentDrag = true ;
        window.lyyState.Item = {
            originLeft:$(e.target).offset().left,
            originTop:$(e.target).offset().top,
            offsetLeft:$(e.target).position().left,
            offsetTop:$(e.target).position().top,
            text:text,
            icon:icon
        };
        $('#MoveContentP').html("<i class=''>"+icon+"</i>"+text);
/*
        const { handleMouseDown } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleMouseDown(e.clientX, e.clientY,
            e.target.getBoundingClientRect().left, e.target.getBoundingClientRect().top, text, icon);*/
    };
    render() {
        const { list, position , select} = this.props ;
        return (
            <ul className={position == "left" ? "ulLeft":"ulRight"}>
                {
                    list.map((li, index)=>{
                        return (
                            <li key={index} className="">
                                <p id=""
                                   className="" title={li.tip} href="#"
                                   onMouseDown={this.handleMouseDown.bind(this,li.text,li.icon)}
                                   onMouseUp={this.handleMouseUp}
                                   onClick={this.handleSelect.bind(this,li.text,li.icon)}
                                >
                                    <i className="" dangerouslySetInnerHTML={{__html:li.icon}}></i>
                                    {li.text}
                                </p>
                            </li>
                        )
                    })
                }

            </ul>
        )
    }
}
function mapStateFieldListToProps(state,props) {
    let list = props.list||[];
    let select =  false;
    if (state.componentPageState && state.componentPageState.select == true){
        select = true ;
    }

    let position = props.position||"";
    return {list:list,position:position,select:select}
}
function mapDispatchToProps(dispatch) {
    return {
        handleSelect: (text, icon) => {
            dispatch({
                type: 'Select_ComponentPageItem',
                componentType:text,
                icon:icon
            });
        },
        handleMouseMove: () => {
            dispatch({
                type: 'Move_ComponentPageItem'
            });
        },
        handleMouseDown: (mouseX,mouseY,left,top,text, icon) => {
            dispatch({
                type: 'MouseDown_ComponentPageItem',
                text: text,
                icon:icon,
                mouseX:mouseX,
                mouseY:mouseY,
                left:left,
                top:top
            });
        }
    };
}
const ConnectedComponentContentFieldList = connect(mapStateFieldListToProps, mapDispatchToProps)(ComponentContentFieldList);

export class ComponentContent extends Component {
    render() {
        const { list } = this.props ;
        return (
            <div className = "ComponentContent">
                {
                    list.map((field,index)=>{
                        return [
                            <h3 key={index} className="fields-group">{field.title}</h3> ,
                            <ConnectedComponentContentFieldList  position="left" list={field.left}/>,
                            <ConnectedComponentContentFieldList  position="right" list={field.right}/>
                        ]
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {list:state.componentPageState.componentPageList}
}
const ConnectedComponentContent = connect(mapStateToProps)(ComponentContent);
export default ConnectedComponentContent