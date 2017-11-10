export default class ToDo {
    constructor(title, listId, marked) {
        this.title = title;
        this.listId = String(listId);
        this.marked = marked || false;
        this.completed = false;
        this.dueDate = '';
        this.remindDate = '';
        this.note = "";
        this.type = "todo"
    }
}