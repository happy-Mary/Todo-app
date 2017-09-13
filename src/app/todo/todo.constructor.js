import generateId from '../module/generateId';

export default class ToDo {
	constructor(title, listId, marked){
		this.id = generateId();
		this.title = title;
		this.listId = listId;
		this.completed = false;
		// this.subtasks = [];
		// add marked value
		this.marked = marked || false;
	}
}

