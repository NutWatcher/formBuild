/**
 * Created by lyy on 2017/1/2.
 */

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/preview'
import Preview from './containers/Preview'
import {LoadFormTemplate} from './actions/http'

import './index.less';

let aaa=[
    [{"type":"ComTextBox","label":"单行文本","length":"m","max":"","min":"0","value":"","date":"","name":0}],
    [{"type":"ComDatePickerBox","label":"日期","length":"m","value":"","description":"","require":true,"noRepeat":false,"name":1}]
]
let config = [
    [{"type":"ComDatePickerBox","label":"姓名","length":"s","value":"today","name":0,"tip":"请输入姓名"}],
    [{"type":"ComTextBox","label":"姓名","length":"s","value":"初始值","name":0,"tip":"请输入姓名"}],
    [{"type":"ComTextBox","label":"地址","length":"xxl","value":"","name":1}],
    [{"type":"ComImageBox","label":"照片","src":"http://imageimages.jsform.com/58665da00cf259e60ea70ba6.jpg","name":2}],
    [{"type":"ComImageBox","label":"照片","src":"http://imageimages.jsform.com/58665da00cf259e60ea70ba6.jpg","name":2}]
];
const store = createStore(reducer,{
    list:config,ModalState:{active:false}
});
const middleware = [ thunk ];
let newStore = applyMiddleware(...middleware)(createStore)(reducer);
newStore.dispatch(LoadFormTemplate());
render(
    <Provider store={newStore}>
        <Preview  />
    </Provider>,
    document.getElementById('root')
)