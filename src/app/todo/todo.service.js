import todoModule from './todo.module';
import ToDo from './todo.constructor';
import { URLS } from '../constants';

export default todoModule
    .service('todoService', function todoService($filter, $http, localStorageService) {
        const self = this;
        self.data = [];

        function getData() {
            return self.data;
        }

        function save() {
            localStorageService.set('todo', self.data);
        }

        function registerTodo() {
            localStorageService.get('todo').then((response) => {
                    self.data.push(...response);
                    save();
                })
                .catch(() => {
                    $http({ method: 'GET', url: URLS.todoURL })
                        .then((response) => {
                            self.data.push(...response.data);
                            save();
                        })
                        .catch(() => {
                            self.data = [];
                            save();
                        });
                });
        }

        function getOneTodo(id) {
            let currItem;
            angular.forEach(self.data, (item) => {
                if (item.id == id) {
                    currItem = item;
                }
                return currItem;
            });
        }

        function updateTodo() {
            save();
        }

        function setTodo(obj) {
            self.data = obj;
        }

        function deleteTodo(id) {
            const index = self.data.findIndex(x => x.id == id);
            self.data.splice(index, 1);
            return self.data;
        }

        function createTodo(title, listId, marked) {
            const todo = new ToDo(title, listId, marked);
            self.data.push(todo);
            save();
        }

        function getCountTodoInList(listId) {
            const todo = self.data.filter((item) => {
                return (item.listId == listId && !item.completed);
            });
            return todo.length;
        }

        return {
            register: registerTodo,
            set: setTodo,
            get: getData,
            getTodo: getOneTodo,
            delete: deleteTodo,
            create: createTodo,
            update: updateTodo,
            getCountTodo: getCountTodoInList
        };
    });