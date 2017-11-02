export default class List {
    constructor(title, folderId) {
        this.title = title;
        this.folderId = folderId || null;
        this.taskCount = 0;
        this.type = 'list';
    }
}