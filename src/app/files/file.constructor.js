import generateId from '../module/generateId';

export default class File {
    constructor(taskId, url, name, size) {
        this.id = Number(generateId());
        this.taskId = Number(taskId);
        this.name = name;
        this.size = Number(size);
        this.url = url;
        // change after server ready
        this.loaded = new Date();
    }
}