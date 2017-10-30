import generateId from '../module/generateId';

export default class ListGroup {
    constructor(title) {
		this.name = title;
		this.id = Number(generateId());
		this.type = 'folder';
	}
}