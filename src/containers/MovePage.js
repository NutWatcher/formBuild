/**
 * Created by lyy on 2016/12/31.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import './MovePage.less';

export class Move extends Component {
    render() {
        return (
            <div className="MoveContent hide" id="MovePage" >
                <p id="MoveContentP" className="" href="#">
                    <i className=""></i>
                </p>
            </div>
        );
        const { icon, text, select, show, back, left, top, moveX, moveY, big} = this.props;
        if (select == true && show == true) {
            return (
                <div className={"MoveContent " + (big==true?"big":"")} style={{left:left,top:top,transform:"translate("+moveX+"px,"+moveY+"px)"}}>
                    <p id="MoveContentP" className="" href="#">
                        <i className="" dangerouslySetInnerHTML={{__html:icon}}></i>
                        {text}
                    </p>
                </div>
            )
        }
        else if (select == false && back == true){
            return (
                <div className={"MoveContent z1 " + (big==true?"big":"")}>
                    <p id="" className="" href="#">
                        <i className="" dangerouslySetInnerHTML={{__html:icon}}></i>
                        {text}
                    </p>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    let moveState = state.componentPageState.moveState ;
    //console.log(moveState);
    return {...moveState};
}

const ConnectedMove = connect(mapStateToProps)(Move);
export default ConnectedMove