/**
 * Created by lyy on 2017/1/11.
 */
/**
 * 一些特殊的组件需要初始化
 */
const Update_ComMultipleSelectBox = (config) => {
    /**
     * 反序列化选项
     */
    let tempOptions = config["options"].split("￥￥");
    let deep = 0 ;
    let newOptions = {child:[], start:true};
    let nowPoint = newOptions;
    for (let i = 0 ; i < tempOptions.length ; i ++){
        let item = tempOptions[i];
        let tempDeep = 0 ;
        for (let j = 0 ; j < item.length ; j ++){
            if (item[j] =='-' ){
                tempDeep ++ ;
            }
            else {
                break;
            }
        }
        if (tempDeep == deep){
            //是儿子
            let tempPoint = {name:item,child:[],faPoint:nowPoint};
            nowPoint = tempPoint;
            nowPoint.faPoint.child.push(nowPoint);
            deep ++ ;
            continue ;
        }
        else if (tempDeep < deep){
            //往前找父亲
            let len = deep-tempDeep;
            for (let k = 0 ; k < len ; k ++){
                nowPoint = nowPoint.faPoint;
                deep -- ;
                if(nowPoint.start == true){
                    //已经是最前面
                    break;
                }
            }
            let tempPoint = {name:item,child:[],faPoint:nowPoint};
            nowPoint = tempPoint;
            nowPoint.faPoint.child.push(nowPoint);
            deep ++ ;
            continue ;
        }
    }
    let list = [];
  //  console.log(newOptions);
    //递归去除链表
    function dfs(father) {
        father["child"].map((item)=>{
            dfs(item);
        });
        father.faPoint = "";
    }
    dfs(newOptions);
    config["optionsList"] = newOptions;
   // console.log("递归去除链表");
  //  console.log(JSON.stringify(config["optionsList"]));
    newOptions["child"].map((item, index)=>{
        list.push(item.name);
    });
    config["configList"] = [ {value:" ",options:list}];
    for (let i = 0 ; i < config["selectNum"]-1 ; i ++){
        config["configList"].push({value:"",options:[]});
    }
};
module.exports = {
    Update_ComMultipleSelectBox : Update_ComMultipleSelectBox
}