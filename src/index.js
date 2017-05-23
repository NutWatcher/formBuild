import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './containers/App'
import {LoadTemplate} from './actions/http'
import './index.less';

let componentPageList = [
    {title:"通用组件",left:[
        {icon:"&#xe643;",text:"单行文本",tip:"适用于填写简短的文字内容，身份证号、银行卡号、工号等请使用此类型。"},
        {icon:"&#xe61a;",text:"多行文本",tip:"适用于填写大段文本，如“备注”、“留言”"},
        {icon:"&#xe66f;",text:"单选框",tip:"适用于在少量选项里选一个，如“男/女”"},
        {icon:"&#xe62a;",text:"日期",tip:"单选框"},

        {icon:"&#xe62b;",text:"文件上传",tip:"适用于收集文件，如简历、照片"},
        {icon:"&#xe61b;",text:"分隔符",tip:"用于将字段分组显示，更清晰"}
    ],right:[
        {icon:"&#xe640;",text:"数字",tip:"适用于填写涉及到数学运算的数字，身份证号、银行卡号、工号等请使用单行文本。"},
        {icon:"&#xe696;",text:"多选框",tip:"适用于在几个选项里选多个，如投票"},
        {icon:"&#xe626;",text:"下拉框",tip:"适用于在非常多的选项里选一个，如省份选择"},
        {icon:"&#xe646;",text:"时间",tip:"适用于填写特定的时间"},
        {icon:"&#xe613;",text:"图片",tip:"在表单上加入图片，起到宣传产品或美化表单的作用"},
        {icon:"&#xe65a;",text:"描述文字",tip:"适用于添加HTML显示元素，如“p,a,span,div”等"},
    ]},
    {title:"高级组件",left:[
        {icon:"&#xe652;",text:"姓名",tip:"适用于填写用户姓名"},
        {icon:"&#xe698;",text:"地址",tip:"适用于填写全国的地址"},
        {icon:"&#xe642;",text:"多级下拉框",tip:"适用于展示多级联动，如第一级是饮料，第二级只能选择绿茶、红茶等"},
        {icon:"&#xe68f;",text:"电话",tip:"适用于填写中国大陆内的手机和座机号码"},
        {icon:"&#xe671;",text:"配图商品",tip:"适用于发布精美配图的商品"}
    ],right:[
        {icon:"&#xe65c;",text:"电子邮箱",tip:"适用于填写电子邮箱地址"},
        {icon:"&#xe614;",text:"网址",tip:"适用于填写网站链接"},
        {icon:"&#xe693;",text:"地理位置",tip:"通过地图收集地理信息，手机上可自动定位"},
        {icon:"&#xe670;",text:"组合单选框",tip:"适用于处理批量单选"},
        {icon:"&#xe65d;",text:"无图商品",tip:"适用于发布无图的商品，如门票"}
    ]}
];
const middleware = [ thunk ];
let newStore = applyMiddleware(...middleware)(createStore)(reducer, {
    componentPageState:{componentPageList:componentPageList},
    PropertyState:{components:[],propertyComponents:[]}
});
newStore.dispatch(LoadTemplate());
render(
    <Provider store={newStore}>
        <App  />
    </Provider>,
    document.getElementById('root')
)