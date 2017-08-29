import listModule from './list.module';

export default listModule
    .controller('listController', function listController($http) {
        let self = this;

       	$http({method: 'GET', url: 'https://api.myjson.com/bins/eigzx'})
			.then(function success(response) {
	                self.lists = response.data;
	      	});
    });