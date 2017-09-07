import generateId from '../module/generateId';

export default class ToDo {
	constructor(title, listId){
		this.id = generateId();
		this.title = title;
		this.listId = listId;
		this.subtasks = [];
		// add marked value
		this.marked = false;
	}
}

