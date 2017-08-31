import todoModule from './todo.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';
import todoService from './todo.service';

export default todoModule
    .controller('todoController', function todoController($http, localStorageService, todoService) {
        let self = this;
        self.todo;
        self.openInput = false;
        self.newTitle = '';
        let parentId = 1;

        self.filterData = function(item) {
            if(item.listId === parentId){
                return item;
            }
        };

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
        

        function InitPage(){
            if(localStorageService.get('todo')){
                self.todo = localStorageService.get('todo');
                todoService.set(self.todo);
            }
            else {
                $http({ method: 'GET', url: URLS.todoURL })
                .then(function successCallback(response) {
                    self.todo = response.data;
                    localStorageService.set('todo', self.todo);
                    todoService.set(self.todo);
                })
                .catch(function errorCallback() {
                    // self.todo = require('../../app-data/todo.json');
                    self.todo = [];
                    todoService.set(self.todo);
                });
            }
    }     
    InitPage();   

    });