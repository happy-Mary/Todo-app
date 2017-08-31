import generateId from '../module/generateId';

export default function ListGroup(title){
	this.title = title;
	this.id = generateId();
	this.lists = [];
}