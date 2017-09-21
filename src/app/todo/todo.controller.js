import todoModule from './todo.module';
import todoService from './todo.service';
import listService from '../list/list.service';

export default todoModule
    .controller('todoController', function todoController($stateParams, todoService, listService) {
        let self = this;
        self.todo = todoService.get();
        self.newTitle = '';
        // from router
        self.parentId = $stateParams.listid;


        self.changeMarked = function(){
            todoService.update();
        };

        self.lists = listService.get();

        
    });