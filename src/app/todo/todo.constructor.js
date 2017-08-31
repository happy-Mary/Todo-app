import generateId from '../module/generateId';

export default function ToDo(title, listId) {
 	this.id = generateId();
 	this.title = title;
 	this.listId = listId;
 	this.subtasks = [];
 	
 }