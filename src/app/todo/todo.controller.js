import todoModule from './todo.module';

export default todoModule
    .controller('todoController', function todoController($stateParams, todoService, listService) {
        const self = this;
        self.todo = todoService.get();
        self.newTitle = '';
        self.completedShown = false;
        // from router
        self.parentId = $stateParams.listid;

        self.changeTodo = function() {
            todoService.update();
        };

        self.lists = listService.get();
    });