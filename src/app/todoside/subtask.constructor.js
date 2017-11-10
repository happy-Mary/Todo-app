export default class Subtask {
    constructor(title, taskId) {
        this.title = title;
        this.taskId = String(taskId);
        this.completed = false;
    }
}