import generateId from '../module/generateId';

export default function List(title, listGroupId){
	this.id = generateId();
 	this.title = title;
 	this.listGroupId = listGroupId;
 	this.todoLists = [];
 } 