import generateId from '../module/generateId';

export default function ListGroup(id, title){
	this.title = title;
	this.id = generateId();
	this.lists = [];
}