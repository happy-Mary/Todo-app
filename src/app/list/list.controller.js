import listModule from './list.module';
import '../../sass/lists.scss';

export default listModule
    .controller('listController', function listController(listService, modalService, todoService) {
        const self = this;
        self.lists = listService.get();

        self.newListTitle = '';

        self.modal = modalService;

        self.newList = (title) => {
            listService.create(title);
        };

        self.handleEdit = (list) => {
            self.onEdit({ item: list });
        };

        self.handleDelete = (list) => {
            self.onDelete({ item: list });
        };

        self.$onInit = () => {
            self.onEdit = self.onEdit;
            self.onDelete = self.onDelete;
            self.onContextMenu = self.onContextMenu;
        };

        self.getCountTodo = todoService.getCountTodo;

        self.verifyDragList = (obj) => {
            let allow;
            if (obj.type === 'list') {
                allow = true;
            } else {
                allow = false;
            }
            return allow;
        };

        self.verifyListDrop = (dragObj, dropObj) => {
            let allow;
            if (dragObj.type === 'todo' && dropObj.type === 'list') {
                allow = true;
            } else {
                allow = false;
            }
            return allow;
        };

        self.handleDrop = (dragObj, dropObj) => {
            const taskDataEdit = { listId: dropObj._id };
            todoService.update(dragObj, taskDataEdit);
        };

        self.openContextMenu = (event, item) => {
            const currEvent = event;
            const currItem = item;
            self.onContextMenu({ event: currEvent, item: currItem });
        };
    });