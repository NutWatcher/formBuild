/**
 * Created by lyy on 2017/1/12.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import './TopToolPage.less';
import {saveTemplate, publishTemplate, previewTemplate} from '../actions/http'

export class App extends Component {
    handleSaveTemplate =(e)=>{
        const { saveTemplate } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        saveTemplate();
    };
    handlePublishTemplate=(e)=>{
        const { publishTemplate } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        publishTemplate();
    };
    handlePreviewTemplate=(e)=>{
        const { previewTemplate } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        previewTemplate();
    };
    render() {
        return (
            <div className="actionButton">
                <a className=" iconfont save iconfontBtn" title="保存"
                   onClick={this.handleSaveTemplate}>&#xe692;</a>
                <a  className=" iconfont preview iconfontBtn" title="预览"
                   onClick={this.handlePreviewTemplate}>&#xe69b;</a>
                <a className=" iconfont publish iconfontBtn" title="发布"
                   onClick={this.handlePublishTemplate}>&#xe674;</a>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    return {...state}
}
const mapDispatchToProps = {
    publishTemplate:publishTemplate,
    previewTemplate:previewTemplate,
    saveTemplate:saveTemplate
};

const AppContent = connect(mapStateToProps,mapDispatchToProps)(App);
export default AppContent