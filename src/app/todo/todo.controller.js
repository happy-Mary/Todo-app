import todoModule from './todo.module';

export default todoModule
    .controller('todoController', function todoController($stateParams, $state, todoService, listService) {
        const self = this;
        self.todo = todoService.get();
        self.newTitle = '';
        self.completedShown = false;
        // from router
        // console.log($state.includes("lists.todo"));

        self.hasListId = $state.includes("lists.todo");
        self.parentId = $stateParams.listid;
        self.searchParam = $stateParams.search;

        self.changeTodo = () => {
            todoService.update();
        };

        self.lists = listService.get();
    });