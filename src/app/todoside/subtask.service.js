import todosideModule from './todoside.module';
import Subtask from './subtask.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default todosideModule
    .service('subtaskService', function subtaskService($http, localStorageService) {
        const self = this;
        self.data = [];

        function getData() {
            return self.data;
        }

        function save() {
            localStorageService.set('subtask', self.data);
        }

        function getDataFromSerever() {
            return $http({ method: 'GET', url: URLS.subtaskURL })
                .then((response) => {
                    self.data = [];
                    self.data.push(...response.data);
                    save();
                })
                .catch(() => {
                    self.data = [];
                    save();
                });
        }

        function registerSubtasks() {
            return localStorageService.get('subtask').then((response) => {
                    self.data = [];
                    self.data.push(...response);
                    save();
                })
                .catch(() => getDataFromSerever());
        }

        function getSubtasksInTodo(todoId) {
            const currItem = [];
            angular.forEach(self.data, (item) => {
                if (item.taskId == todoId) {
                    currItem.push(item);
                }
            });
            return currItem;
        }

        function updateSubtask() {
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

        function createTodo(title, todoId) {
            const subtask = new Subtask(title, todoId);
            self.data.push(subtask);
            save();
        }

        return {
            register: registerSubtasks,
            set: setTodo,
            get: getData,
            getSubtasks: getSubtasksInTodo,
            delete: deleteTodo,
            create: createTodo,
            update: updateSubtask,
        };
    });