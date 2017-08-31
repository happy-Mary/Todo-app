import listGroupModule from './listgroup.module';
import ListGroup from './listgroup.constructor';

export default listGroupModule
	.service('listGroupService', function(){
		function createListGroup(name){
			var a = new ListGroup(name);
			console.log(a.id);
		}
		return{
			createListGroup: createListGroup
		}
	});