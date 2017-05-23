/**
 * Created by lyy on 2016/12/31.
 */
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import './EditTextArea.less';

export class ComEditTextArea extends Component {
    componentDidMount(){
        const { uId, handelOnChange, componentPoint } = this.props ;
        console.log("edit componentDidMount");
        console.log(uId);
        console.log(componentPoint.value);



        var textArea = document.getElementById(uId);
        var E = window.wangEditor;
        var $ = window.jQuery;

        // 用 createMenu 方法创建菜单
        E.createMenu(function (check) {
            var menuId = 'img1';
            if (!check(menuId)) {
                return;
            }
            var editor = this;
            var lang = editor.config.lang;

            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,
                id: menuId,
                title: lang.img,
                $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>'),
                $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-picture"></i></a>')
            });

            // 创建 panel content
            var $panelContent = $('<div class="panel-tab"></div>');
            var $tabContainer = $('<div class="tab-container"></div>');
            var $contentContainer = $('<div class="content-container"></div>');
            $panelContent.append($tabContainer).append($contentContainer);

            // tab
            var $uploadTab = $('<a href="#">上传图片</a>');
            var $linkTab = $('<a href="#">网络图片</a>');
            $tabContainer.append($uploadTab).append($linkTab);

            // 上传图片 content
            var $uploadContent = $('<div class="content"></div>');
            $contentContainer.append($uploadContent);

            // 网络图片 content
            var $linkContent = $('<div class="content"></div>');
            $contentContainer.append($linkContent);
            linkContentHandler(editor, menu, $linkContent);

            // 添加panel
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $panelContent,
                width: 200,
                onRender: function () {
                    // 渲染后的回调事件，用于执行自定义上传的init
                    // 因为渲染之后，上传面板的dom才会被渲染到页面，才能让第三方空间获取到
                    var init = editor.config.customUploadInit;
                    init && init.call(editor);
                }
            });

            // 增加到editor对象中
            editor.menus[menuId] = menu;
            $tabContainer.remove();
            $uploadContent.remove();
            $linkContent.addClass('selected');

        });

        // --------------- 处理网络图片content ---------------
        function linkContentHandler (editor, menu, $linkContent) {
            var lang = editor.config.lang;
            var $urlContainer = $('<div style="margin:20px 10px 10px 10px;"></div>');
            var $urlInput = $('<input type="text" class="block" placeholder="http://"/>');
            $urlContainer.append($urlInput);
            var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
            var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');

            $linkContent.append($urlContainer).append($btnSubmit).append($btnCancel);

            // 取消
            $btnCancel.click(function (e) {
                e.preventDefault();
                menu.dropPanel.hide();
            });

            // callback
            function callback() {
                $urlInput.val('');
            }

            // 确定
            $btnSubmit.click(function (e) {
                e.preventDefault();
                var url = $.trim($urlInput.val());
                if (!url) {
                    // 无内容
                    $urlInput.focus();
                    return;
                }

                var imgHtml = '<img style="max-width:100%;" src="' + url + '"/>';
                editor.command(e, 'insertHtml', imgHtml, callback);
            });
        }

        var editor1 = new wangEditor(textArea);
        editor1.config.menus = [
            'source',
            'bold',
            'italic',
            'eraser',
            'forecolor',
            'bgcolor',
            'fontsize',
            'unorderlist',
            'img1',
            'alignleft',
            'aligncenter',
            'alignright',
            'link',
            'unlink',
            'table'
        ];
        editor1.create();
        window.lyyState.wangEditor = editor1;
        editor1.onchange = function () {
            handelOnChange(uId, window.lyyState.wangEditor.$txt.html());
        };
        window.lyyState.wangEditor.$txt.html(componentPoint.value);
    }
    componentDidUpdate(){
        const { componentPoint } = this.props ;
        window.lyyState.wangEditor.$txt.html(componentPoint.value);
    }
    render() {
        const { uId , property} = this.props ;
        return (
            <div className = "ComEditTextArea">
                <div  id={uId} style={{"height":"250px","maxHeight":"250px"}}>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    return {
        uId:props.componentPoint.uId||"ComEditTextArea",
        componentPoint : props.componentPoint||{}
    };
}
function mapDispatchToProps(dispatch) {
    return {
        handelOnChange: (uId, value) => {
            dispatch({
                type: 'Update_ComObject',
                uId: uId,
                value:value
            });
        }
    };
}
const ConnectedComEditTextArea = connect(mapStateToProps, mapDispatchToProps)(ComEditTextArea);
export default ConnectedComEditTextArea