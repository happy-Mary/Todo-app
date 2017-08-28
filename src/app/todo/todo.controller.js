import todoModule from './todo.module';

export default todoModule
	.controller('todoController', function todoController($http){
		var self = this;

		$http({method: 'GET', url: 'app-data/todo.json'})
			.then(function success(response) {
	                self.todo = response.data;
	      	});
});

