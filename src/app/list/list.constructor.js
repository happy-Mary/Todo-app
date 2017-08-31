import generateId from '../module/generateId';

export default class List {
	constructor(title, listGroupId){
		this.id = generateId();
		this.title = title;
		this.listGroupId = listGroupId;
		this.todoLists = [];
	}
}