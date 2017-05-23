/**
 * Created by lyy on 2017/1/6.
 */
/**
 * 属性列表拖动动画
 * @param mouseY
 */

const documentTop = () => {
    return document.documentElement.scrollTop || document.body.scrollTop ;
}
const documentLeft = () => {
    return document.documentElement.scrollLeft || document.body.scrollLeft ;
}
const dragPropertySelectBoxItem = (mouseY) => {
    let index = window.lyyState.Item["index"] || 0 ;
    let list = $('#propertySelectBoxList').find('li');
    if (window.lyyState.Item["id"] == "PropertyMultipleCheckBoxList"){
        list = $('#' + window.lyyState.Item["id"]).find('li');
    }
    if (window.lyyState.Item["fly"] != true){
        let height = $(list).outerHeight();
        window.lyyState.Item["fly"] = true ;
        window.lyyState.Item["height"] = height ;
        $(list[index]).after("<li class = 'blank ComCheckBox ' style='height:"+height+"px'></li>");
        $(list[index]).addClass("fly");
        window.lyyState.Item["top"] = $(list[index]).offset().top;
        window.lyyState.Item["mouseY"] = mouseY;
    }
    let blankIndex = 0 ;
    let flyIndex = 0 ;
    for (let i = 0 ; i < list.length ; i ++ ){
        if ($(list[i]).hasClass('blank')){
  //          console.log("blank + " + index);
            blankIndex = i ;
        }
        if ($(list[i]).hasClass('fly')){
    //        console.log("blank + " + index);
            flyIndex = i ;
        }
    }
    console.log(window.lyyState.Item["top"]);
    console.log($(list[index]).scrollTop());
    let mouseOffset = window.lyyState.Item["mouseY"] - mouseY;
    $(list[flyIndex]).offset({ top: window.lyyState.Item["top"] - mouseOffset - $('.layoutWrap').scrollTop()});

    for (let i = 0 ; i < list.length ; i ++ ){
    //    console.log(i);
        let top = $(list[i]).offset().top-$(document).scrollTop();
        let bottom = $(list[i]).innerHeight()+top;
   //     console.log(mouseY);
   //     console.log(top + "-"+ bottom);
        if ($(list[i]).hasClass('blank')){
            continue;
        }
        if ($(list[i]).hasClass('fly')){
            continue;
        }
        if(mouseY > top-5 && mouseY <  bottom+5 ){

      //      console.log("changechangechangechangechange");
     //       console.log(blankIndex);
     //       console.log(i);
            let temp = list[i];
            $(list[blankIndex]).remove();
            let str = "<li class = 'blank ComCheckBox ' style='height:"+window.lyyState.Item["height"]+"px'></li>";
     //       console.log(temp);
            if (blankIndex < i){console.log("before");
            //    console.log("after");
                $(temp).after(str);
            }
            else {
            //    console.log("before");
                $(temp).before(str);
            }
            break;
        }
    }
};
const dragComponentSelectBoxItem = (mouseX, mouseY) => {
   // console.log("dragComponentSelectBoxItem");
    //console.log(window.lyyState.Item["originLeft"]+"-"+window.lyyState.Item["originTop"]);
    if (window.lyyState.Item["fly"] != true){
        //console.log(window.lyyState.Item["originLeft"]+"-"+window.lyyState.Item["originTop"]);
        window.lyyState.Item["fly"] = true ;
        let page = $('#MovePage');
        $(page).removeClass('hide').width(140).height(38)
            .position({
                left:window.lyyState.Item["originLeft"],
                top:window.lyyState.Item["originTop"]
            });
        window.lyyState.Item["mouseX"] = mouseX;
        window.lyyState.Item["mouseY"] = mouseY;
    }
    let mouseYOffset = window.lyyState.Item["mouseY"] - mouseY;
    let mouseXOffset = window.lyyState.Item["mouseX"] - mouseX;
    $('#MovePage').offset({
        top: window.lyyState.Item["originTop"] - mouseYOffset,
        left: window.lyyState.Item["originLeft"] - mouseXOffset
    });
    mouseX = mouseX + documentLeft() ;
    mouseY = mouseY + documentTop() ;
    let ulLeft = $('#MainUl').offset().left;
    let ulTop = $('#MainUl').offset().top;
    let ulRight = $('#MainUl').offset().left +  $('#MainUl').outerWidth();
    let ulBottom = $('#MainUl').offset().top +  $('#MainUl').outerHeight();
    if ( mouseX > ulLeft && mouseX < ulRight && mouseY > ulTop && mouseY < ulBottom){
       // console.log("inin");
        $('#MovePage').width(580).height(100).addClass('hide').addClass('dropItemIn');
        $('#MoveContentP').hide();
        window.lyyState.Item["drop"] = true ;
        if (window.lyyState.Item["blankPage"] == false){
            window.lyyState.Item["blankPage"] = true ;
            $('#mainLiBlank').before("<li class='tempBlankLi'></li>");
        }
        let liList = $('#MainUl').find('li');
        let insertIndex = 0 ;
        let deleteIndex = 0 ;
        let changFlag = false ;
        for (let i = 0 ; i < liList.length ; i ++){
            if ($(liList[i]).hasClass('tempBlankLi')){
                deleteIndex = i ;
                continue;
            }
            let liLeft = $(liList[i]).offset().left;
            let liTop = $(liList[i]).offset().top;
            let liRight = $(liList[i]).offset().left +  $(liList[i]).outerWidth();
            let liBottom = $(liList[i]).offset().top +  $(liList[i]).outerHeight();
            if ( mouseX > liLeft && mouseX < liRight && mouseY > liTop && mouseY < liBottom){
                if (mouseY < liTop + (liBottom-liTop)/2){
                    insertIndex = i ;
                }
                else{
                    insertIndex = i + 1 ;
                }
                changFlag = true ;
            }
        }
      //  console.log(insertIndex + '-' + deleteIndex);
        if (insertIndex  == deleteIndex){
            changFlag = false ;
        }
        if (changFlag == true) {
            if (deleteIndex < insertIndex) {
                $(liList[insertIndex]).before("<li class='tempBlankLi'></li>");
                $(liList[deleteIndex]).remove();
            }
            else {
                $(liList[deleteIndex]).remove();
                $(liList[insertIndex]).before("<li class='tempBlankLi'></li>");
            }
        }
    }
    else{
        $('#MovePage').width(140).height(38).removeClass('hide').removeClass('dropItemIn');
        $('#MoveContentP').show();
        window.lyyState.Item["drop"] = false ;
        window.lyyState.Item["blankPage"] = false ;
        $('#MainUl').find('.tempBlankLi').remove();
    }
    //console.log(ulLeft + '-' + ulTop + '-' + ulRight + '-' + ulBottom);
};
const releaseComponentSelectBoxItem = (animate) =>{
    console.log("ReleaseComponentSelectBoxItem");
    if (animate == false){
        $('#MovePage').width(140).height(38).removeClass('hide').removeClass('dropItemIn').addClass('hide');
    }

    $('#MovePage')
        .animate(
            { left: window.lyyState.Item["originLeft"] , top: window.lyyState.Item["originTop"]},
            1000,function () {
                $('#MoveContentP').show();
                $('#MovePage').width(140).height(38).addClass('hide');
            });
    window.lyyState.startComponentDrag = false;
};
const dragMainPageItem = (mouseX, mouseY) => {
    let index = window.lyyState.Item["index"] || 0 ;
    let list = $('#MainUl').find('li');
    if (window.lyyState.Item["fly"] != true){
        let height = $(list[index]).outerHeight();
        window.lyyState.Item["fly"] = true ;
        window.lyyState.Item["height"] = height ;
        $(list[index]).after("<li class = 'tempBlankLi ' style='height:"+height+"px'></li>");
        $(list[index]).addClass("fly");
        window.lyyState.Item["top"] = $(list[index]).offset().top;
        window.lyyState.Item["offsetTop"] = $(list[index]).offset().top - mouseY - documentTop();
        window.lyyState.Item["mouseY"] = mouseY;

        let page = $('#moveWarp');
        $(page).removeClass('hide').width(100).height(100)
            .offset({
                top: mouseY + documentTop() - 50,
                left: mouseX + documentLeft() - 50 ,
            });
    }

    //遮盖层，防止click事件发生
    $('#moveWarp').offset({
            top: mouseY + documentTop() - 50,
            left: mouseX + documentLeft() - 50,
        });


    let flyIndex = 0 ;
    for (let i = 0 ; i < list.length ; i ++ ){
        if ($(list[i]).hasClass('fly')){
            flyIndex = i ;
        }
    }
    let liList = $('#MainUl').find('li');
    let insertIndex = 0 ;
    let deleteIndex = 0 ;
    let changFlag = false ;
    let offsetMouseY = mouseY + documentTop();
    $(list[flyIndex]).offset({ top: offsetMouseY + window.lyyState.Item["offsetTop"]});
    for (let i = 0 ; i < liList.length - 1; i ++){
        if ($(liList[i]).hasClass('tempBlankLi')){
            deleteIndex = i ;
            continue;
        }
        if ($(liList[i]).hasClass('fly')){
            continue;
        }
        let liTop = $(liList[i]).offset().top;
        let liBottom = $(liList[i]).offset().top +  $(liList[i]).outerHeight();
        if (offsetMouseY > liTop && offsetMouseY < liBottom){
            if (offsetMouseY < liTop + (liBottom-liTop)/2){
                insertIndex = i ;
            }
            else{
                insertIndex = i + 1 ;
            }
            changFlag = true ;
        }
    }
    if (insertIndex  == deleteIndex){
        changFlag = false ;
    }
    if (changFlag == true) {
        if (deleteIndex < insertIndex) {
            $(liList[insertIndex]).before("<li class = 'tempBlankLi ' style='height:"+window.lyyState.Item["height"]+"px'></li>");
            $(liList[deleteIndex]).remove();
        }
        else {
            $(liList[deleteIndex]).remove();
            $(liList[insertIndex]).before("<li class = 'tempBlankLi ' style='height:"+window.lyyState.Item["height"]+"px'></li>");
        }
    }
};
module.exports = {
    dragProperty:dragPropertySelectBoxItem,
    dragComponent:dragComponentSelectBoxItem,
    releaseComponent:releaseComponentSelectBoxItem,
    dragMainPageItem:dragMainPageItem
} ;