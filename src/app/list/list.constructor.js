import generateId from '../module/generateId';

export default class List {
    constructor(title, listGroupId) {
        this.id = Number(generateId());
        this.title = title;
        this.listGroupId = Number(listGroupId) || null;
        this.type = 'list';
    }
}