import listModule from './list.module';

export default listModule
    .controller('listController', function listController($http) {
        let self = this;

       	$http({method: 'GET', url: 'app-data/lists.json'})
			.then(function success(response) {
	                self.lists = response.data;
	      	});
    });