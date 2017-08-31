import todoModule from './todo.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default todoModule
    .controller('todoController', function listController($http, localStorageService) {
        let self = this;
        self.filterById = 1;

        self.filterData = function(item) {
            if(item.listId === self.filterById){
                return item;
            }
        };

        if(localStorageService.get('todo')){
            self.listGroups = localStorageService.get('todo');
        }
        else {
            $http({ method: 'GET', url: URLS.todoURL })
            .then(function successCallback(response) {
                self.todo = response.data;
                localStorageService.set('todo', self.todo);
                localStorageService.set('lists', self.todo);
            })
            .catch(function errorCallback() {
                // self.todo = require('../../app-data/todo.json');
                self.todo = [];
            });
        }
              

    });