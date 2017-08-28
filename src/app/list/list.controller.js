import listModule from './list.module';

import data from '../../app-data/lists.json';


export default listModule
    .controller('listController', function listController($http) {
        let self = this;
<<<<<<< HEAD
        self.helloList = "it's list controller";
        self.lists = data;
        console.log(data);
=======

       	$http({method: 'GET', url: 'app-data/lists.json'})
			.then(function success(response) {
	                self.lists = response.data;
	      	});
>>>>>>> MariaChernyak
    });