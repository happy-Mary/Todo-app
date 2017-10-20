import generateId from '../module/generateId';

export default class File {
    constructor(taskId, url, name, size) {
        this.id = generateId();
        this.taskId = taskId;
        this.name = name;
        this.size = size;
        this.url = url;
        // change after server ready
        this.loaded = new Date();
    }
}