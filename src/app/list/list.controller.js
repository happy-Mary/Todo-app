import listModule from './list.module';





export default listModule
    .controller('listController', function listController($http) {
		let self = this;
		let data = require('../../app-data/lists.json');
		console.log(data);
		self.list = 'list';
       	// $http({method: 'GET', url: 'app-data/lists.json'})
		// 	.then(function success(response) {
	    //             self.lists = response.data;
	    //   	});
    });