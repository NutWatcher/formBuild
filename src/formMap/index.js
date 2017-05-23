/**
 * Created by lyy on 2017/1/1.
 */
import MapImageBox from './imageBox'
import MapTextBox from './textBox'
import MapDatePickerBox from './datePicker'
import MapSelectBox from './selectBox'
import MapHtmlBox from './htmlBox'
import MapSeparatorBox from './separatorBox'
import MapTimeBox from './timeBox'
import MapFileUploadBox from './fileUploadBox'
import MapShopBox from  './shopBox'
import MapShopBoxWithImage from  './shopBoxWithImage'
import MapAddressBox from  './addressBox'
import MapHeadBox from  './headBox'
import MapMultipleSelectBox from './multipleSelectBox'
import MapLocationBox from './locationBox'
import MapTextAreaBox from './textAreaBox'
import MapCheckBoxList from './checkBoxList'
import MapRadioBoxList from './radioBoxList'
import MapNumberBox from './numberBox'
import MapTextBoxName from './textBoxName'
import MapTextBoxHttp from './textBoxHttp'
import MapTextBoxEmail from './textBoxEmail'
import MapTelephoneBox from './telephoneBox'
import MapMultipleCheckBox from './multipleCheckBox'
/**
 *
 * @description 根据组件名称返回组件的初始化配置列表
 */
const MapConfig ={
    "单行文本":MapTextBox,
    "多行文本":MapTextAreaBox,
    "图片":MapImageBox,
    "日期":MapDatePickerBox,
    "下拉框":MapSelectBox,
    "描述文字":MapHtmlBox,
    "分隔符":MapSeparatorBox,
    "时间":MapTimeBox,
    "文件上传":MapFileUploadBox,
    "无图商品":MapShopBox,
    "配图商品":MapShopBoxWithImage,
    "地址":MapAddressBox,
    "头图":MapHeadBox,
    "多级下拉框":MapMultipleSelectBox,
    "地理位置":MapLocationBox,
    "多选框":MapCheckBoxList,
    "单选框":MapRadioBoxList,
    "数字":MapNumberBox,
    "姓名":MapTextBoxName,
    "电子邮箱":MapTextBoxEmail,
    "网址":MapTextBoxHttp,
    "电话":MapTelephoneBox,
    "组合单选框":MapMultipleCheckBox
};
export default MapConfig