export function getMyDate(str) {
    var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth()+1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay) +' '+ addZero(oHour) +':'+
addZero(oMin) +':'+addZero(oSen);
    return oTime;
}

//补零操作
function addZero(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}

export function time1(msd) {
    // console.log(msd);
    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
        
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
                parseInt(time / 60.0)) * 60) + "秒";
                console.log(time);
        }
        else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                parseInt(time / 3600.0)) * 60) + "分钟" +
                parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
        }else if(time >= 60 * 60 * 24 && time < 60 * 60 * 24 * 30){
            time = parseInt(time / (3600.0*24)) + "天" + parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + "小时" + parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) + "分钟" + parseInt((time % (1000 * 60)) / 1000) +"秒"
        }
        else {
            time = parseInt(time) + "秒";
        }
    }
    return time;
}