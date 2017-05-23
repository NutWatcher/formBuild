/**
 * Created by lyy on 2017/1/10.
 */
import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import ComTip from './Tip'
import './MultipleCheckBox.less';
export class ComMultipleCheckBox extends Component {
    handleOnChange = (rowId, columnId, e) => {
        const {handleOnChange, uId} = this.props;
        handleOnChange(rowId, columnId, uId, e.target.checked);
    };
    render() {
        const {
            rowOptions, options, showNumber, value,
            label,  configList, uId, selectNum,
            require, validated, description
        } = this.props;
        let tbodyList = [];
        let theadList = []
        for(let j = 0 ; j < rowOptions.length ; j ++){
            let tempTdList = [];
            for(let i = 0 ; i < options.length ; i ++){
                let input = <input type="radio" checked={value[j]["checkedIndex"] == i} onChange={this.handleOnChange.bind(this, j, i)}/>;
                if (showNumber == false){
                    tempTdList.push(<td key={i}>{input}</td>);
                }
                else{
                    tempTdList.push(<td key={i}>{input}<p>{i+1}</p></td>);
                }
            }
            tbodyList.push(<tr key={j}><th>{rowOptions[j].name}</th>{tempTdList}</tr>);
        }

        for(let i = 0 ; i < options.length ; i ++){
            theadList.push(<td key={i}><p>{options[i].value}</p></td>);
        }

        return (
            <div className="ComMultipleCheckBox">
                <p className={label == "" ? "hide" : ""}>
                    {label}
                </p>
                {
                    require ? <p className="red">*</p> : null
                }
                <span className="validated">{validated}</span>
                <div className="description">{description}</div>
                <div >
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            {
                                theadList
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tbodyList
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state, props) {
    let componentPoint = props.componentPoint;
    // console.log("下拉框选项");
    // console.log(componentPoint.options);
    return {
        description: componentPoint.description || "",
        label: componentPoint.label || "",
        showNumber: componentPoint.showNumber || false,
        value: componentPoint.value || "",
        rowOptions: componentPoint.rowOptions || [],
        options: componentPoint.options || [],
        selectNum: componentPoint.selectNum || "2",
        uId: componentPoint.uId == null ? null : componentPoint.uId,
        require: componentPoint.require || false,
        validated: componentPoint.validated == null ? null : componentPoint.validated
    };
}
function mapDispatchToProps(dispatch) {
    return {
        handleOnChange: (rowId, columnId, uId, value) => {
            dispatch({
                type: 'Update_ComObject',
                rowId:rowId,
                columnId:columnId,
                uId: uId,
                value: value
            });
        }
    };
}
const ConnectedComMultipleCheckBox = connect(mapStateToProps, mapDispatchToProps)(ComMultipleCheckBox);
export default ConnectedComMultipleCheckBox