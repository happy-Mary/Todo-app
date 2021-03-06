import todoModule from './todo.module';
import '../../sass/todo.scss';

export default todoModule
    .controller('todoController', function todoController($stateParams, $state, todoService, listService, $transitions) {
        const self = this;
        self.todo = todoService.get();
        self.newTitle = '';
        self.completedShown = false;
        // from router
        self.searchParam = $stateParams.search;
        self.hasListId = $state.includes("filter");

        $transitions.onSuccess({ to: 'filter' }, () => {
            self.searchParam = $stateParams.search;
            self.hasListId = $state.includes("filter");
        });

        self.handleEdit = (todo) => {
            self.onEdit({ item: todo });
        };

        self.handleDelete = (todo) => {
            self.onDelete({ item: todo });
        };

        self.changeTodo = (task) => {
            todoService.update(task);
        };

        self.lists = listService.get();

        self.verifyDragTask = (obj) => {
            let allow;
            if (obj.type === 'todo') {
                allow = true;
            } else {
                allow = false;
            }
            return allow;
        };

        self.openContextMenu = (event, item) => {
            const currEvent = event;
            const currItem = item;
            self.onContextMenu({ event: currEvent, item: currItem });
        };

        self.$onInit = () => {
            self.onContextMenu = self.onContextMenu;
        };
    });