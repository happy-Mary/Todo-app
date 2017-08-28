import listGroupModule from './listgroup.module';

export default listGroupModule
	.controller('listGroupController', function listGroupController($http){
		var self = this;

		$http({method: 'GET', url: 'app-data/listGroups.json'})
			.then(function success(response) {
	                self.listGroups = response.data;
	      	});
})

