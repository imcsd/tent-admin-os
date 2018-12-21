/* Date Format
 * Version: 0.0.1 Alpha
 * Last Update： 2018-05-28 17:20:15
 * param fmt String e.g: "yyyy-MM-dd hh:mm:ss"
 *       date Date() Object e.g new Data()
 * return fmt String
 * invoke method e.g: dateFmt("yyyy-MM-dd hh:mm:ss", new Date())
 */
function dateFmt(fmt,date){
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

export default dateFmt;