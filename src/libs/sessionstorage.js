let set = function(key,value){
	return window.sessionStorage.setItem(key,value);
};
let get = function(key){
	return window.sessionStorage.getItem(key);
};
let remove = function(key){
	return window.sessionStorage.removeItem(key);
};
let clear = function(){
	window.sessionStorage.clear();
}
export {set, get, remove, clear};