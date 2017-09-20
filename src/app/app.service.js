import mainModule from './app.module';

export default mainModule
.service('localStorageService', function(){
	function set(key, data){
		let promise = new Promise(function(resolve, reject){
			setTimeout(function(){
				localStorage.setItem(key, JSON.stringify(data));
				resolve();
			}, 1000);
		});
		return promise;
	}
	function get(key){
		let promise = new Promise(function(resolve, reject){
			setTimeout(function(){
				let resault = JSON.parse(localStorage.getItem(key));
				if(resault){
					resolve(resault);
				}
				else{
					reject('Error');
				}
				
			}, 1000);
		});
		return promise;

	}
	// function set(key, data){
		
	// 			localStorage.setItem(key, JSON.stringify(data));

	// }
	// function get(key){
		
	// 			let resault = JSON.parse(localStorage.getItem(key));
	// 		return resault;

	// }
	return {
		get: get,
		set: set
	};
});