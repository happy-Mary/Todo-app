import listGroupModule from './listgroup.module';
import ListGroup from './listgroup.constructor';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default listGroupModule
	.service('listGroupService', function($http, localStorageService){
		this.data =[];
		var self = this;
		self.data =[];

   		function save(){
   			localStorageService.set('listGroups', self.data);
		   }
		   
   		function registerListGroups(){
   			if(localStorageService.get('listGroups')){
          	  self.data = localStorageService.get('listGroups');
            }
	        else{
	             $http({ method: 'GET', url: URLS.listGroupURL })
	                .then(function successCallback(response) {
	                    self.data = response.data;
	                    save();
	                })
	                .catch(function errorCallback() {
	                   self.data =  [];
	                   save();
	                });
	        }
		}

		function getListGroups(){
			return self.data;
		}
		
   		function getListGroup(id){
   			self.data.forEach(function(group){
   				if(group.id == id){
   					return group;
   				}
   			});
   		}

   		function deleteListGroup(id) {
	        var index = data.findIndex(group => group.id == id);
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
		//    }

		// registerListGroups();

		return{
			register: registerListGroups,
			get: getListGroups,
			create: createListGroup,
			getGroup: getListGroup,
			deleteGroup: deleteListGroup,
			save: save
		}
	});