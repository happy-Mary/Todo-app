import todoModule from './todo.module';
import { URLS } from '../constants';

export default todoModule
    .controller('todoController', function listController($http) {
        let self = this;
        $http({ method: 'GET', url: URLS.todoURL })
            .then(function successCallback(response) {
                self.todo = response.data;
            }, function errorCallback() {
                console.log("request FAILED");
                self.todo = require('../../app-data/todo.json');
            });
    });