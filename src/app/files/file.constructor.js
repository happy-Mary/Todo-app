export default class File {
    constructor(name, size, taskId, url) {
        // remove after server ready
        // this.id = Number(generateId());
        this.name = name;
        this.size = Number(size);
        this.taskId = String(taskId);
        this.url = url;
        // change after server ready
        // this.loaded = new Date();
    }
}