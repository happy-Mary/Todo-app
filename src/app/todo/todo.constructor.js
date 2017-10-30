import generateId from '../module/generateId';

export default class ToDo {
    constructor(title, listId, marked) {
        // remove after server ready
        this.id = generateId();
        this.title = title;
        this.listId = listId;
        this.marked = marked || false;
        this.completed = false;
        // change/delete after server ready
        this.date = new Date();
        this.dueDate = 0;
        this.remindDate = 0;
        this.note = "";
    }
}