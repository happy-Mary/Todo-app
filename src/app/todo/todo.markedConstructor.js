import generateId from '../module/generateId';

export default class Marked {
	constructor(obj){
		this.listTitle = obj.listId; 
		this.todos = new Array(obj);
	}
}