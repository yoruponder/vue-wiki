export let number_format = (num) => {
    var source = String(num).split(".");//按小数点分成2部分
        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");//只将整数部分进行都好分割
    return source.join(".");//再将小数部分合并进来
}
export let setPageRem = (psWidth) => {
    var thisWidth = window.screen.width > 750 ? 750 : window.screen.width;
    var zoomSize  = (thisWidth / psWidth).toFixed(4)*100;
    document.getElementsByTagName('html')[0].style.fontSize = zoomSize+'px';
    // if(window.location.hostname.indexOf('dev') > -1){
    //     window.onresize = function(){
    //         var thisWidth = window.screen.width;
    //         var zoomSize  = (thisWidth / psWidth).toFixed(4)*100;
    //         document.getElementsByTagName('html')[0].style.fontSize = zoomSize+'px';
    //     }
    // }
}
export let escape2Html = (str) => {
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}

export let json2url = (data) => {
    let url = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');
    return url
}