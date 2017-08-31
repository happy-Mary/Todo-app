import mainModule from './app.module';

export default mainModule
.service('localStorageService', function(){
	function set(key, data){
		localStorage.setItem(key, JSON.stringify(data));
	}
	function get(key){
		
		return JSON.parse(localStorage.getItem(key));
	}
	return {
		get: get,
		set: set
	}
});