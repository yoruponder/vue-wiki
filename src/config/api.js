let url = window.location.protocol + '//';
let Api = '';

if (window.location.hostname.indexOf('dev') > -1){
    Api = url + 'wiki.dev.8591.com.tw:5050/api';
} else if(window.location.hostname.indexOf('wiki.8591') <= -1) {
    Api = url + 'wiki.8591.com.tw/api';
} else {

}
export {Api};