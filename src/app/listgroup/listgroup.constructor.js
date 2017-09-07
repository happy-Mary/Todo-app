import generateId from '../module/generateId';

export default class ListGroup {
	constructor(title){
		this.title = title;
		this.id = generateId();
		// this.lists = [];
	}
}