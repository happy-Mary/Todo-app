import generateId from '../module/generateId';

export default class ListGroup {
    constructor(title) {
        // title after server ready
        this.name = title;
        // remove after server ready
        this.id = generateId();
        this.type = 'folder';
    }
}