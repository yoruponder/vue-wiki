let set = function(key,value){
	return window.localStorage.setItem(key,value);
};
let get = function(key){
	return window.localStorage.getItem(key);
};
let remove = function(key){
	return window.localStorage.removeItem(key);
};
let clear = function(){
	window.localStorage.clear();
}
export {set, get, remove, clear};