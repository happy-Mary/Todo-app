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
   					console.log(group)
   					return group;
   				}
   			})
   		}
		function createListGroup(name){
			var a = new ListGroup(name);
			console.log(a.id);
		}
		return{
			set: setListGroups,
			get: getListGroups,
			create: createListGroup,
			getGroup: getListGroup
		}
	});