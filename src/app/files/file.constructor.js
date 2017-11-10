export default class File {
    constructor(name, size, taskId) {
        this.name = name;
        this.size = Number(size);
        this.taskId = String(taskId);
        this.path = '';
        // change after server ready
        this.loaded = 0;
    }
}