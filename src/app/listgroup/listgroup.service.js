import listGroupModule from './listgroup.module';
import ListGroup from './listgroup.constructor';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default listGroupModule
	.service('listGroupService', function($http, localStorageService){
		var self = this;
		self.data = [];

   		function save(){
   			localStorageService.set('listGroups', self.data);
		}
		   
	   	function registerListGroups(){
	        localStorageService.get('listGroups').then(function successCallback(response){
	         	self.data.push(...response);
	            save();
	        })
	        .catch(function(){
	             $http({ method: 'GET', url: URLS.listGroupURL })
	                .then(function successCallback(response) {
	                   self.data.push(...response.data);
	                   save();
	                   console.log('got data from server');
	                })
	                .catch(function errorCallback() {
	                    self.data =  [];
	                    save();
	                });
	        })
	    }  

		function getListGroups(){
			return self.data;
		}

		function updateListGroup(){
			save();
		}
		
   		function getListGroup(id){
   			self.data.forEach(function(group){
   				if(group.id == id){
   					return group;
   				}
   			});
   		}

   		function deleteListGroup(id) {
	        var index = self.data.findIndex(group => group.id == id);
	        self.data.splice(index, 1);
	        save();
   		}

		function createListGroup(name){
			var data = new ListGroup(name);
			self.data.push(data);
			save();
					}

		// function setListGroups(data) {
		// 	self.data = data;
		// 	save();
		// }

		return {
			register: registerListGroups,
			get: getListGroups,
			data: self.data,
			create: createListGroup,
			update: updateListGroup,
			delete: deleteListGroup,
			// /////
			getGroup: getListGroup,
			
			save: save
		};
	});