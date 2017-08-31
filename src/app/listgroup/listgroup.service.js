import listGroupModule from './listgroup.module';
import ListGroup from './listgroup.constructor';

export default listGroupModule
	.service('listGroupService', function(){
		this.data =[];
		var self = this;

		function setListGroups(data) {
      		self.data = data;
   		}
   		function getListGroups(){
   			return data;
   		}
   		function getListGroup(id){
   			self.data.forEach(function(group){
   				if(group.id == id){
   					return group;
   				}
   			})
   		}

   		function deleteListGroup(id) {
	        var index = data.findIndex(group => group.id == id);
	        self.data.splice(index, 1);
   		}

		function createListGroup(name){
			var group = new ListGroup(name);
			self.data.push(data);
		}

		return{
			set: setListGroups,
			get: getListGroups,
			create: createListGroup,
			getGroup: getListGroup,
			deleteGroup: deleteListGroup
		}
	});