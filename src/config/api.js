import ajax from './axios';

let protocol = window.location.protocol + '//';
let requestUrl = '';
let Api = {};

if (window.location.hostname.indexOf('dev') > -1){
    requestUrl = protocol + 'wiki.dev.8591.com.tw:5050/api';
} else if(window.location.hostname.indexOf('wiki.8591') > -1) {
    requestUrl = protocol + 'wiki.8591.com.tw/api';
} else {
    requestUrl = protocol + 'localhost:5050/api';
}

Api.index = (data) => ajax.get(requestUrl, { params: data });
Api.favorite = (data) => ajax.get(requestUrl, { params: data });
Api.rank = (data) => ajax.get(requestUrl, { params: data });
Api.hotTag = (data) => ajax.get(requestUrl, { params: data });
Api.issue = (data) => ajax.get(requestUrl, { params: data });
Api.detail = (data) => ajax.get(requestUrl, { params: data });
Api.getEditAnswer = (data) => ajax.get(requestUrl, { params: data });
Api.submitEditAnswer = (data) => ajax.post(requestUrl, data);
Api.delAnswer = (data) => ajax.get(requestUrl, { params: data });
Api.replyIssue = (data) => ajax.post(requestUrl, data);
Api.closeIssue = (data) => ajax.get(requestUrl, { params: data });
Api.addFavorite = (data) => ajax.get(requestUrl, { params: data });
Api.editIssue = (data) => ajax.get(requestUrl, { params: data });
Api.finishEdit = (data) => ajax.post(requestUrl, data);
Api.category = (data) => ajax.get(requestUrl, { params: data });
Api.navTag = (data) => ajax.get(requestUrl, { params: data });
Api.submitIssue = (data) => ajax.post(requestUrl, data);
Api.life = (data) => ajax.get(requestUrl, { params: data });



export {Api};