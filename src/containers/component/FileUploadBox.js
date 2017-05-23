/**
 * Created by lyy on 2017/1/9.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ComTip from './Tip'
import './FileUploadBox.less';

export class ComFileUploadBox extends Component {
    removeOldFile = (fileId) => {
        const { uId, picker, } = this.props;
        for(let i = 0 ; i < window.lyyStatePicker[picker]["oldFileList"].length ; i ++){
            if (window.lyyStatePicker[picker]["oldFileList"][i].id == fileId){
                window.lyyStatePicker[picker]["oldFileList"].splice(i,1);
            }
        }
        $("#OldUpFileItem" + fileId).remove();
        console.log(window.lyyStatePicker[picker]);
        console.log(window.lyyStatePicker[picker]["oldFileList"]);
    };
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
    componentDidUpdate(){
        const { value, picker } = this.props;
       // console.log("componentDidUpdate");
      //  console.log(value);
        window.lyyStatePicker[picker].oldFileList = value;
        //console.log(window.lyyStatePicker[picker]);
    }
    componentDidMount(){
        const { uId, value, handleFileAlert, picker, fileSingleSizeLimit, fileType } = this.props;
        console.log("componentDidMount");
        console.log(value);
        window.lyyStateTemp = window.lyyStateTemp ||{};
        window.lyyStatePicker = window.lyyStatePicker || {};
        window.lyyStatePicker[picker] = window.lyyStatePicker[picker] || {
                uId:uId,
                oldFileList:[],
                fileList:[],
                deleteList:[],
                showDateId: 0,
                nextInputIndex : 1
            };

        let inputFileType = "";
        for (let i = 0 ; i < fileType.length ; i ++){
            if ( i == 0 ){
                inputFileType += "." + fileType[i] ;
            }
            else{
                inputFileType += ",." + fileType[i] ;
            }
        }
        let nextInput = "upFileForm" + picker + "Item" + window.lyyStatePicker[picker].nextInputIndex;
        $("#pickerBtn" + picker).on("click", function () {
            let nextInput = "upFileForm" + picker + "Item" + window.lyyStatePicker[picker].nextInputIndex;
            console.log(nextInput);
            $('#'+nextInput).click();
        });
        var removeFIle = function (showDataId, index) {
            $('#' + showDataId).remove();
            window.lyyStatePicker[picker].deleteList[index] = false ;
        };
        var FileOnChange = function (e) {
            //console.log("console.log(fileSingleSizeLimit) " + fileSingleSizeLimit);
            //console.log($(e.target)[0].files);
            // console.log($(e.target)[0].files[0].size);
            //let fileSize = $(e.target)[0].files[0].size;
            let selectFileList = $(e.target)[0].files;
            for (let i = 0 ; i < selectFileList.length ; i ++ ){
                //console.log(fileType);
                let fileNameLength = selectFileList[i].name.toLocaleLowerCase().length ;
                let fileFilter = false ;
                //console.log(fileNameLength);
                for(let j = 0 ; j < fileType.length ; j ++){
                    if (fileType[j] == ""){
                        continue;
                    }
                    //console.log(selectFileList[i].name.toLocaleLowerCase());
                    //console.log(selectFileList[i].name.toLocaleLowerCase().lastIndexOf(fileType[j].toLocaleLowerCase() ));
                    if (selectFileList[i].name.toLocaleLowerCase().lastIndexOf(fileType[j].toLocaleLowerCase() ) ==  fileNameLength-fileType[j].length ){
                        fileFilter = true ;
                        break;
                    }
                }
                if(fileFilter == false){
                    handleFileAlert(uId, "不支持该文件类型上传");
                    return ;
                }
                if(selectFileList[i].size > fileSingleSizeLimit*1024*1024){
                   // alert(selectFileList[i].name + ":文件太大了");
                    var file = $($(e.target)[0]);
                    file.after(file.clone().val("").on("change",FileOnChange));
                    file.remove();

                    handleFileAlert(uId, "文件不能大于" + (fileSingleSizeLimit==""?0:fileSingleSizeLimit) + "M");
                    return ;
                }
            }
            if(selectFileList.length > 0){
                let oldLength = window.lyyStatePicker[picker].fileList.length ;
                Array.prototype.push.apply(window.lyyStatePicker[picker].fileList, selectFileList);
                let tempList = window.lyyStatePicker[picker].fileList;
                var windowURL = window.URL || window.webkitURL;
                for (let i = oldLength ; i < tempList.length ; i ++){
                    window.lyyStatePicker[picker].deleteList[i] = true ;
                    let fileName = tempList[i].name;
                    let dataURL = windowURL.createObjectURL(tempList[i]);
                    let showDataItemId = "upFileForm" + picker + "ShowDataItem" + window.lyyStatePicker[picker].showDateId;
                    window.lyyStatePicker[picker].showDateId ++ ;

                    var $li = $(
                            '<div id="' + showDataItemId + '" class="uploadFileItem">' +
                            '<img style="width: 80px;height: 80px;" ' +
                            'src=' + window.formBuildState.ImageLocation + '/blank.png' + '>' +
                            '<a id="remove_' + showDataItemId + '" class="deleteIcon" ' +
                            'style="background:no-repeat scroll 0 0 #fff;' +
                            'background-image: url(\'' + window.formBuildState.ImageLocation + '/cancel.png\')" ' +
                            'title="删除" href="javascript:void(0)" ></a>'+
                            '<div class="info">' + fileName + '</div>' +
                            '</div>'
                        ),
                        $img = $li.find('img');

                    $("#UpFileList" + picker).find('.cl').before( $li );
                    let AllImgExt=".jpg|.jpeg|.gif|.bmp|.png|";
                    let extName = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();//（把路径中的所有字母全部转换为小写）
                    if(AllImgExt.indexOf(extName+"|")!=-1)
                    {
                        $img.attr('src', dataURL);
                    }

                    $("#UpFileList" + picker).find('#remove_'+showDataItemId).click(function () {
                        removeFIle(showDataItemId, i);
                    } );
                }

                window.lyyStatePicker[picker].nextInputIndex ++ ;
                let nextId = "upFileForm" + picker + "Item" + window.lyyStatePicker[picker].nextInputIndex;
                let newInput = $('<input name="file" multiple="multiple" accept=' + inputFileType + ' type="file" id="'+ nextId +'" />');
                $($(e.target)[0]).after(newInput);
                $('#' + nextId).on("change",FileOnChange);
            }

            handleFileAlert(uId, "");
        };
        $('#' + nextInput).on('change',FileOnChange);

    }
    render() {
        const { label , picker, tip, uId, value,fileType,
            require, validated, description} = this.props ;
        let inputFileType = "";
        for (let i = 0 ; i < fileType.length ; i ++){
            if ( i == 0 ){
                inputFileType += "." + fileType[i] ;
            }
            else{
                inputFileType += ",." + fileType[i] ;
            }
        }
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

                <div id={"OldUpFileList" + picker} className="oldUpFileList">
                    {
                        value == ""? null:
                        value.map((item , index)=>{
                            return(
                                <p key={index} id={"OldUpFileItem" + item.id}  className="content_download"><a href={item.url} >{item.name}</a>
                                    <a className="deleteIcon"
                                       onClick={this.removeOldFile.bind(this, item.id)}
                                       style={{
                                           background:"no-repeat scroll 0 0 #fff",
                                           backgroundImage: "url(\'" + window.formBuildState.ImageLocation + "/cancel.png\')" }}
                                       title="删除" href="javascript:void(0)" > </a>
                                </p>
                            )
                        })
                    }
                    <div className="cl" style={{clear:"both"}}></div>
                </div>

                <div id={"UpFileList" + picker}>
                    <div className="cl" style={{clear:"both"}}></div>
                </div>

                <div className="formWrap">
                    <form className="upFileForm" id={"upFileForm" + picker}>
                        <input name="file" multiple="multiple" accept={inputFileType}
                               type="file" id={"upFileForm" + picker + "Item1"} />
                    </form>
                    <input name="uId" style={{display:"none"}} defaultValue={uId}/>
                </div>
                <div className="pickerWrap">
                    <div className="pickerBtn" id={"pickerBtn" + picker} >选择文件</div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    let componentPoint = props.componentPoint;
    return {
        picker:componentPoint.picker + componentPoint.uId||"picker" + componentPoint.uId,
        dispatchSrc:componentPoint.dispatchSrc||false,
        fileType:componentPoint.fileType.split(',')||["image"],
        multipleFile:componentPoint.multipleFile||"false",
        upFileList:componentPoint.upFileList||[],
        label:componentPoint.label||"",
        value : componentPoint.value||[],
        tip:componentPoint.tip||null,
        length:componentPoint.length||"m",
        description:componentPoint.description||"",
        fileSingleSizeLimit:componentPoint.fileSingleSizeLimit,
        uId:componentPoint.uId == null ? null : componentPoint.uId,
        name:componentPoint.uId == null ? null : componentPoint.uId,
        require:componentPoint.require||false,
        validated:componentPoint.validated == null ? null:componentPoint.validated,
        autoUpload:componentPoint.autoUpload || false,
        accept:componentPoint.accept || ""
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleFileAlert: (uId, msg) => {
            dispatch({
                type: 'Show_FileUploadBoxMsg',
                uId: uId,
                value:msg
            });
        },
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