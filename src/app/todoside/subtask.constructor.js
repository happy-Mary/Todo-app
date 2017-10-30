import generateId from '../module/generateId';

export default class Subtask {
    constructor(title, taskId) {
        this.id = generateId();
        this.title = title;
        this.taskId = Number(taskId);
        this.completed = false;
    }
}