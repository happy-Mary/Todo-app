import listGroupModule from './listgroup.module';
import ListGroup from './listgroup.constructor';

export default listGroupModule
	.service('listGroupService', function(){
		function createListGroup(name){
			var a = new ListGroup(2, name);
			console.log(a.title);
		}
		return{
			createListGroup: createListGroup
		}
	});