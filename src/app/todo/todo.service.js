import todoModule from './todo.module';
import ToDo from './todo.constructor';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default todoModule
    .service('todoService', function($filter, $http, localStorageService) {
        let itemItem;
        let self = this;
        self.data = [];

        function get() {
            return self.data;
        };

        function save() {
            localStorageService.set('todo', self.data);
        }

        function registerTodo() {
            localStorageService.get('todo').then(function successCallback(response) {
                    self.data.push(...response);
                    save();
                })
                .catch(function() {
                    $http({ method: 'GET', url: URLS.todoURL })
                        .then(function successCallback(response) {
                            self.data.push(...response.data);
                            save();
                            console.log('got data from server');
                        })
                        .catch(function errorCallback() {
                            self.data = [];
                            save();
                        });
                })
        }

        function getTodo(id) {
            self.data.forEach(function(item) {
                if (item.id == id) {
                    itemItem = item;
                }
            });
        }

        function updateTodo() {
            save();
        }

        function setTodo(obj) {
            self.data = obj;
        }

        function deleteTodo(id) {
            let index = data.findIndex(x => x.id == id);
            self.data.splice(index, 1);
            return self.data;
        }

        function createTodo(title, listId, marked) {
            let todo = new ToDo(title, listId, marked);
            self.data.push(todo);
            // return todo;
            console.log(todo);
            save();
        }

    function getCountTodoInList(listId){
        var todo = self.data.filter(function(todo){
            if(todo.listId == listId && !todo.completed){
                return true;
            }
            else{
                return false;
            }
        });
        return todo.length;
    }



        return {
            register: registerTodo,
            set: setTodo,
            get: get,
            getTodo: getTodo,
            delete: deleteTodo,
            create: createTodo,
            update: updateTodo,
            save: save,
            getCountTodo: getCountTodoInList
        };

    });