import todoModule2 from './todo.module';

export default todoModule2
	.controller('todoController', function todoController($http){
		var self = this;

		$http({method: 'GET', url: 'https://api.myjson.com/bins/1cg6h9'})
			.then(function success(response) {
	                self.todo = response.data;
	      	}); 
});

