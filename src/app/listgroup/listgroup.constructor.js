import generateId from '../module/generateId';

export default class ListGroup {
    constructor(title) {
        // title after server ready
        this.name = title;
        // remove after server ready
        this.id = Number(generateId());
        this.type = 'folder';
        this.type = 'folder';
    }
}