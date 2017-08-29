import todoModule from './todo.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default todoModule
    .controller('todoController', function listController($http, localStorageService) {
        let self = this;

        if(localStorageService.get('todo')){
            self.listGroups = localStorageService.get('todo');
        }
        else{
            $http({ method: 'GET', url: URLS.todoURL })
                .then(function successCallback(response) {
                    self.todo = response.data;
                    localStorageService.set('todo', self.todo);
                    localStorageService.set('lists', self.todo);
                }, function errorCallback() {
                    // console.log("request FAILED");
                    // self.todo = require('../../app-data/todo.json');
                    self.todo = [];
                });
        }
              
    });