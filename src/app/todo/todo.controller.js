import todoModule from './todo.module';
import todoService from './todo.service';
import listService from '../list/list.service';

export default todoModule
    .controller('todoController', function todoController($routeParams, todoService, listService) {
        let self = this;
        self.todo = todoService.get();
        self.newTitle = '';
        // from router
        self.parentId = $routeParams.listid;

        // add marked ang change ading todo
        self.saveTask = function() {
            self.todo = todoService.create(self.newTitle, parentId);
            localStorageService.set('todo', self.todo);
            self.openInput = false;
            self.newTitle = '';
        };

        self.deleteTask = function(id){
            self.todo = todoService.delete(id);
            localStorageService.set('todo', self.todo);
        };

        self.rewriteTask = function(id) {
            self.openInput = true;
            todoService.get(id);
        };

        self.changeTask = function(){
            self.todo = todoService.update(self.newTitle);
            localStorageService.set('todo', self.todo);
            self.openInput = false;
            self.newTitle = '';
        };
        
        function getMarkedLists(){
            self.markedLists = [];
            let unicId = [];
            for(var i = 0; i<self.todo.length; i++) {
                let id = self.todo[i].listId;

                if(self.todo[i].marked===true && !unicId.includes(id)){
                    unicId.push(id);
                    // self.markedLists.push(listService.get(id));
                }
            }
        }
        getMarkedLists();
    });