import listGroupModule from './listgroup.module';

export default listGroupModule
	.controller('listGroupController', function listGroupController($http){
		var self = this;

		$http({method: 'GET', url: 'https://api.myjson.com/bins/dx1e5'})
			.then(function success(response) {
	                self.listGroups = response.data;
	      	});
})

