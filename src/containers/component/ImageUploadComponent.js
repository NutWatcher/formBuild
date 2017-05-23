/**
 * Created by lyy on 2017/1/10.
 */
import React from 'react'
import { Component } from 'react'
import './ImageUploadComponent.less';
export class ComImageUploadComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            src:this.props.src
        }
    }
    componentDidMount(){
        const { picker , finishUpload } = this.props;
        let self = this;
        var uploader = WebUploader.create({
            swf: window.formBuildState.ImageLocation  + '/Uploader.swf',
            server: window.formBuildState.FileUploadUrl,
            pick: {
                id:'#' + picker,
                style:''
            },
            accept:{
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/jpg,image/jpeg,image/png'   //修改这行
            },
            formData:{
                templateId: window.lyyStateTemp.templateId || "",
                version: window.lyyStateTemp.version || ""
            },
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            auto:true
        });
        $($('#'+picker).find('.webuploader-pick')[0]).css("padding","0");
        $($('#'+picker).find('.webuploader-pick')[0]).addClass("uploadContainer");

        uploader.on( 'uploadSuccess', function( file , response) {
           /* if (response.res != 1){
                return handleOnFileUpLoadError(response.resMsg);
            }*/

            console.log("dispatchSrc:" + response.obj.list[0].url);
            finishUpload(response.obj.list[0].url);
            self.state["src"] = response.obj.list[0].url;
            self.setState(self.state);
            return;
        });
        uploader.on( 'uploadError', function( file ) {
            //finishUpload("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2693004020,2764238842&fm=23&gp=0.jpg");
            alert("上传失败");
            console.log("uploadError");
           // handleOnFileUpLoadError();
        });
    }
    render() {
        const {picker } = this.props;
        console.log("picker" + picker);
        return (
            <div className = "ComImageUploadComponent">
                <img  src={this.state.src} />
                <div id={picker} className="uploadContainer">
                    <img  src={this.state.src} />
                </div>

            </div>
        )
    }
}
export default ComImageUploadComponent