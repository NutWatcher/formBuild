/**
 * Created by lyy on 2016/12/30.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTextBox from './TextBox'
import ComNumberBox from './NumberBox'
import ComImageBox from './ImageBox'
import ComTextAreaBox from './TextAreaBox'
import ComSelectSingle from './SelectSingle'
import ComEditTextArea from './EditTextArea'
import ComCheckBoxList from './checkBoxList'
import ComRadioBoxList from  './RadioBoxList'
import ComDatePickerBox from './DatePicker'
import ComPropertySelectBox from './PropertySelectBox'
import ComHtmlBox from './htmlBox'
import ComTimeBox from './TimeBox'
import ComFileUploadBox from './FileUploadBox'
import ComPropertyFileUploadBox from './PropertyFileUploadBox'
import ComShopPropertyBox from './ShopPropertyBox'
import ComShopBox from './ShopBox'
import ComAddressBox from './AddressBox'
import ComMultipleSelectBox from './MultipleSelectBox'
import ComLocationBox from './LocationBox'
import ComNameBox from './NameBox'
import ComTelephoneBox from './TelephoneBox'
import ComMultipleCheckBox from './MultipleCheckBox'
import ComPropertyMultipleCheckBox from './PropertyMultipleCheckBox'
import './Layout.less';

let ComList = {
    ComTextBox:ComTextBox,
    ComNumberBox:ComNumberBox,
    ComTextAreaBox:ComTextAreaBox,
    ComImageBox:ComImageBox,
    ComSelectSingle:ComSelectSingle,
    ComEditTextArea:ComEditTextArea,
    ComCheckBoxList:ComCheckBoxList,
    ComRadioBoxList:ComRadioBoxList,
    ComDatePickerBox:ComDatePickerBox,
    ComPropertySelectBox:ComPropertySelectBox,
    ComHtmlBox:ComHtmlBox,
    ComTimeBox:ComTimeBox,
    ComFileUploadBox:ComFileUploadBox,
    ComPropertyFileUploadBox:ComPropertyFileUploadBox,
    ComShopPropertyBox:ComShopPropertyBox,
    ComShopBox:ComShopBox,
    ComAddressBox:ComAddressBox,
    ComMultipleSelectBox:ComMultipleSelectBox,
    ComLocationBox:ComLocationBox,
    ComNameBox:ComNameBox,
    ComTelephoneBox:ComTelephoneBox,
    ComMultipleCheckBox:ComMultipleCheckBox,
    ComPropertyMultipleCheckBox:ComPropertyMultipleCheckBox

};
export class ComLayout extends Component {
    render() {
        const { components , style, uName} = this.props ;
      //  console.log("rerender layout");
      //  console.log(components);
        let list = [];
        for (let i = 0 ; i < components.length ; i ++){
            if(components[i].propertyHide == true){
                continue;
            }
        //    console.log(components[i].type);
            list.push(React.createElement(ComList[components[i].type], {
                key:i,
                componentPoint:components[i]
            }));
        }
        return (
            <div className = "ComLayout" style={style}>
                {list}
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    return {
        components:props.components,
        uName:props.uName
    };
}
const ConnectedComLayout = connect(mapStateToProps)(ComLayout);
export default ConnectedComLayout