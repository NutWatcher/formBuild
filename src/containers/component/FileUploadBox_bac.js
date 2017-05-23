/**
 * Created by lyy on 2017/1/9.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './FileUploadBox.less';

export class ComFileUploadBox extends Component {
    handleOnChange = (uId, e) => {
        const { handleOnChange, validated } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (validated == "number"){
            if (isNaN(e.target.value)){
                return ;
            }
        }
        handleOnChange(uId, e.target.value);
    };
    componentDidMount(){
        const { uId, dispatchSrc, autoUpload, handleOnChange, picker, fileSingleSizeLimit, accept } = this.props;
        const { handleOnFileUpLoadError} = this.props;
        //console.log("autoUpload");
        //console.log(autoUpload);
        window.lyyStateTemp = window.lyyStateTemp ||{};
        var uploader = WebUploader.create({
            swf: window.formBuildState.ImageLocation  + '/Uploader.swf',
            server: window.formBuildState.FileUploadUrl,
            pick: '#' + picker,
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            accept: accept=="image" ? {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/jpg,image/jpeg,image/png'   //修改这行
                    } : null,
            fileSingleSizeLimit: fileSingleSizeLimit*1024*1024,
            auto:autoUpload,
            duplicate:true,
            formData:{
                uId:uId,
                templateId: window.lyyStateTemp.templateId || "",
                version: window.lyyStateTemp.version || ""
            }
        });
        uploader.on( 'uploadSuccess', function( file , response) {
            console.log("uploadSuccess");
            if (response.res != 1){
                return handleOnFileUpLoadError(response.resMsg || "");
            }
            console.log("dispatchSrc" + dispatchSrc);
            if (dispatchSrc == true){
                handleOnChange(uId, response.obj.list[0].url);
               // return ;
            }

            var $li = $(
                    '<div id="' + file.id + '" class="uploadFileItem">' +
                    '<img style="width: 40px;height: 40px;" src=' + response.obj.list[0].url + '>' +
                    '<a id="remove_' + file.id + '" class="deleteIcon" ' +
                    'style="background:no-repeat scroll 0 0 #fff;' +
                    'background-image: url(\'' + window.formBuildState.ImageLocation + '/cancel.png\')" title="删除" href="#" ></a>'+
                    '</div>'
                ),
                $img = $li.find('img');


            $("#UpFileList" + picker).empty().append( $li ).append('<div className="cl" style=\'clear:both\'></div>');
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>'+file.name+'</span>');
                    return;
                }
            }, 100, 100 );

            $("#UpFileList" + picker).find('#remove_'+file.id).click(function () {
                console.log("remove");
                console.log("id " + file.id);
                uploader.removeFile(file.id);
                $("#UpFileList" + picker).find('#'+file.id).remove();
            } );
        });
        uploader.on("error",function (type){
            console.log(type);
            let msg = "";
            if(type == "F_DUPLICATE"){
                msg="系统提示:请不要重复选择文件！";
            }else if(type == "F_EXCEED_SIZE"){
                msg="文件太大了！";
            }
            handleOnFileUpLoadError(msg);
        });
        uploader.on( 'uploadError', function( file ) {
            console.log("uploadError");
            handleOnFileUpLoadError();
        });
        var removeUpLoadFile = function (id, wrapId) {
            console.log("remove");
            console.log("id " + id);
            uploader.removeFile(id);
            $("#" + wrapId).find('#'+id).remove();
        }
        if (autoUpload == false){
            uploader.on( 'fileQueued', function( file ) {
                let fileList = uploader.getFiles();
                for (let i = 0 ; i < fileList.length - 1 ; i ++){
                    if (file.name == fileList[i].name){
                        uploader.removeFile(fileList[i].id);
                        $("#UpFileList" + picker).find('#'+fileList[i].id).remove();
                        break;
                    }
                }
                var $li = $(
                        '<div id="' + file.id + '" class="uploadFileItem">' +
                        '<img style="width: 80px;height: 80px;" ' +
                        'src=' + window.formBuildState.ImageLocation + '/blank.png' + '>' +
                        '<a id="remove_' + file.id + '" class="deleteIcon" ' +
                        'style="background:no-repeat scroll 0 0 #fff;' +
                        'background-image: url(\'' + window.formBuildState.ImageLocation + '/cancel.png\')" title="删除" href="#" ></a>'+
                        '<div class="info">' + file.name + '</div>' +
                        '</div>'
                    ),
                    $img = $li.find('img');
                uploader.makeThumb( file, function( error, src ) {
                    if ( error ) {
                        return;
                    }
                    $img.attr( 'src', src );
                }, 80, 80 );
                $("#UpFileList" + picker).find('.cl').before( $li );
                $("#UpFileList" + picker).find('#remove_'+file.id).click(function () {
                    removeUpLoadFile(file.id, "UpFileList" + picker);
                } );

                handleOnChange(uId, file.name);
            });
            if (window.formBuildState.upload){
                window.formBuildState.upload.push(uploader);
            }
            else {
                window.formBuildState.upload = [uploader];
            }
        }
    }
    render() {
        const { label , picker, tip,
            require, validated, description} = this.props ;
        return (
            <div className = "ComFileUploadBox">
                <p className={label==""?"hide":""}>
                    {label}
                </p>
                {
                    tip == null ? null :  <ComTip text={tip}/>
                }
                {
                    require  ? <p className="red">*</p> :null
                }
                <span className="validated">{validated}</span>
                <div className="description">{description}</div>
                <div id={"UpFileList" + picker}>
                    <div className="cl" style={{clear:"both"}}></div>
                </div>
                <div id={picker}>选择文件</div>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
   // console.log(componentPoint);
    return {
        picker:componentPoint.picker + componentPoint.uId||"picker" + componentPoint.uId,
        dispatchSrc:componentPoint.dispatchSrc||false,
        accept:componentPoint.accept||"image",
        multipleFile:componentPoint.multipleFile||"false",
        upFileList:componentPoint.upFileList||[],
        label:componentPoint.label||"",
        value : componentPoint.value||"",
        tip:componentPoint.tip||null,
        length:componentPoint.length||"m",
        description:componentPoint.description||"",
        fileSingleSizeLimit:componentPoint.fileSingleSizeLimit,
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        name:componentPoint.uId == null ? null : componentPoint.uId,
        validated:componentPoint.validated == null ? null:componentPoint.validated,
        autoUpload:componentPoint.autoUpload || false,
        accept:componentPoint.accept || ""
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleOnChange: (uId, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                value:value
            });
        },
        handleOnFileUpLoadError: (content) => {
            dispatch({
                type: 'handleOnFileUpLoadError',
                content:content||""
            });
        }
    };
}
const ConnectedComFileUploadBox = connect(mapStateToProps, mapDispatchToProps)(ComFileUploadBox);
export default ConnectedComFileUploadBox