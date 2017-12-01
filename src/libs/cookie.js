let get = function (name){
    var arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if( arr = document.cookie.match(reg) )
        return decodeURIComponent(arr[2]);
    else
        return null;
}
let set = function (key, value, options) {
	try{
		options = Object.assign({},options,{domain: envSetting + '.8591.com.tw',path: '/'});
	}catch(err){
		options.domain 	= envSetting+'.8591.com.tw';
		options.path 	= '/'; 
	}
	var expires = options.expires;
	if ('number' == typeof options.expires) {
		expires = new Date();
		expires.setTime(expires.getTime() + options.expires*24*60*60*1000);
	}
	document.cookie =
		key + "=" + encodeURIComponent(value)
		 + (options.path ? "; path=" + options.path : "")
		 + (expires ? "; expires=" + expires.toGMTString() : "")
		 + (options.domain ? "; domain=" + options.domain : "")
		 + (options.secure ? "; secure" : '');
};

export {get, set};