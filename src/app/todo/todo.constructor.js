import generateId from '../module/generateId';

export default class ToDo {
    constructor(title, listId, marked) {
        this.id = generateId();
        this.title = title;
        this.listId = listId;
        this.marked = marked || false;
        this.completed = false;
        this.date = new Date();
        this.dueDate = "";
    }
}