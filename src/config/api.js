import ajax from './axios';

let protocol = window.location.protocol + '//';
let requestUrl = '';
let Api = {};

if (window.location.hostname.indexOf('dev') > -1) {
    requestUrl = protocol + 'wiki.dev.8591.com.tw:5050/api';
} else if (window.location.hostname.indexOf('wiki.8591') > -1) {
    requestUrl = protocol + 'wiki.8591.com.tw/api';
} else {
    requestUrl = protocol + 'localhost:5050/api';
}
//前台接口
Api.index = data => ajax.get(requestUrl, { params: data });
Api.favorite = data => ajax.get(requestUrl, { params: data });
Api.delFavorite = data => ajax.get(requestUrl, { params: data });
Api.rank = data => ajax.get(requestUrl, { params: data });
Api.hotTag = data => ajax.get(requestUrl, { params: data });
Api.issue = data => ajax.get(requestUrl, { params: data });
Api.detail = data => ajax.get(requestUrl, { params: data });
Api.getEditAnswer = data => ajax.get(requestUrl, { params: data });
Api.submitEditAnswer = data => ajax.post(requestUrl, data);
Api.delAnswer = data => ajax.get(requestUrl, { params: data });
Api.replyIssue = data => ajax.post(requestUrl, data);
Api.closeIssue = data => ajax.get(requestUrl, { params: data });
Api.addFavorite = data => ajax.get(requestUrl, { params: data });
Api.editIssue = data => ajax.get(requestUrl, { params: data });
Api.finishEdit = data => ajax.post(requestUrl, data);
Api.category = data => ajax.get(requestUrl, { params: data });
Api.navTag = data => ajax.get(requestUrl, { params: data });
Api.submitIssue = data => ajax.post(requestUrl, data);
Api.life = data => ajax.get(requestUrl, { params: data });
Api.lifeList = data => ajax.get(requestUrl, { params: data });
Api.notificationCategory = () => ajax.get(requestUrl, { params: { c: 'notification', a: 'notificationCategory' } });
Api.notificationList = data => ajax.get(requestUrl, { params: data });
Api.notificationPublish = data => ajax.post(requestUrl, data);;
Api.notificationEdit = data => ajax.post(requestUrl, data);;
Api.notificationDetail = data => ajax.get(requestUrl, { params: data });
Api.loginUser = () => ajax.get(requestUrl, { params: { c: 'user', a: 'user' } });
Api.pingUser = () => ajax.get(requestUrl, { params: { c: 'user', a: 'ping' } });
Api.ucList = data => ajax.get(requestUrl, { params: data });
Api.myIssue = () => ajax.get(requestUrl, { params: { c: 'user', a: 'myIssue' } });
Api.myReply = () => ajax.get(requestUrl, { params: { c: 'user', a: 'myReply' } });
Api.myIssueClose = () => ajax.get(requestUrl, { params: { c: 'user', a: 'myIssueClose' } });
Api.myIssueNoAnswer = () => ajax.get(requestUrl, { params: { c: 'user', a: 'myIssueNoAnswer' } });

//後台接口
Api.admin = {
    users: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'userlist', ...data } }),
    editUser: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'editUser', ...data } }),
    navigation: () => ajax.get(requestUrl, { params: { c: 'admin', a: 'navigation', } }),
    issues: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'allIssue', ...data } }),
    recommend: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'recommendedIssue', ...data } }),
    unrecommend: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'unrecommendedIssue', ...data } }),
    moveIssue: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'moveIssue', ...data } }),
    removeIssue: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'removeIssue', ...data } }),
    replyIssue: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'replyIssue', ...data } }),
    removeReply: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'removeReply', ...data } }),
    category: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'category', ...data } }),
    removeCategory: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'removeCateGoryOne', ...data } }),
    removeCategoryTwo: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'removeCategoryTwo', ...data } }),
    addCategoryOne: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'addCategoryOne', ...data } }),
    addCategoryTwo: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'addCategoryTwo', ...data } }),
    editCategoryName: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'editCategoryName', ...data } }),
    fetchAllTag: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'tag', ...data } }),
    removeTag: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'removeTag', ...data } }),
    addTag: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'addTag', ...data } }),
    editTags: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'editTags', ...data } }),
    notification: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'notification', ...data } }),
    notiCategory: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'notiCategory', ...data } }),
    addNotice: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'addNotificationCategory', ...data } }),
    moveTags: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'moveTags', ...data } }),
    issueTag: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'issueTag', ...data } }),
    removeNotice: data => ajax.get(requestUrl, { params: { c: 'admin', a: 'removeNotice', ...data } }),
    moveNotice: data => ajax.get(requestUrl, { params: { c: 'admin', a: "moveNotification", ...data } })
};

export { Api, requestUrl };