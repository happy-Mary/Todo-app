import generateId from '../module/generateId';

export default class List {
    constructor(title, listGroupId) {
        // remove after server ready
        this.id = Number(generateId());
        this.title = title;
        // change to folderId after server ready
        this.listGroupId = Number(listGroupId) || null;
        this.type = 'list';
    }
}