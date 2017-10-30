import generateId from '../module/generateId';

export default class ToDo {
    constructor(title, listId, marked) {
        this.id = Number(generateId());
        this.title = title;
        this.listId = Number(listId);
        this.marked = marked || false;
        this.completed = false;
        this.date = new Date();
        this.dueDate = "";
        this.note = "";
    }
}