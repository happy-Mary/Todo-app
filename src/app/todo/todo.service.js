import todoModule from './todo.module';
import ToDo from './todo.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default todoModule
    .service('todoService', function todoService($filter, $http, localStorageService) {
        const self = this;
        self.data = [];

        function deleteByIndex(serverData) {
            const index = self.data.findIndex(item => item._id == serverData._id);
            self.data.splice(index, 1);
        }

        function getData() {
            return self.data;
        }

        function save() {
            localStorageService.set('todo', self.data);
        }

        function registerTodo(id) {
            const listId = id;
            return localStorageService.getFiltered(URLS.taskURL, listId).then((response) => {
                self.data = response.data;
            })
        }

        function createTodo(title, listId, marked) {
            const task = new ToDo(title, listId, marked);
            localStorageService.set(URLS.taskURL, task).then((response) => {
                self.data.push(response.data);
            })
        }

        function deleteTodo(id) {
            localStorageService.delete(URLS.taskURL, id).then((response) => {
                deleteByIndex(response.data);
            })
        }

        function updateTodo(task, editedData) {
            const currTask = task;
            const editedTask = editedData || task;
            localStorageService.update(URLS.taskURL, currTask._id, editedTask)
            .then((response) => {
                angular.forEach(Object.keys(currTask), (key) => {
                    if (currTask[key] !== response.data[key]) {
                        currTask[key] = response.data[key];
                        if (key === 'listId') {
                            deleteByIndex(response.data);
                        }
                    }
                });
            })
        }

        //  where do we use it ?????
        function getOneTodo(id) {
            let currItem;
            angular.forEach(self.data, (item) => {
                if (item.id == id) {
                    currItem = item;
                }
            });
            return currItem;
        }

        function setTodo(obj) {
            self.data = obj;
        }

        function changeParent(newListId, taskId) {
            angular.forEach(self.data, (item) => {
                const task = item;
                if (task.id === taskId) task.listId = newListId;
            });
            save();
        }


        return {
            get: getData,
            register: registerTodo,
            delete: deleteTodo,
            create: createTodo,
            update: updateTodo,
            set: setTodo,
            // //////////////////////////////////
            getTodo: getOneTodo,
            // ///////////////////////////////////
            changeParentList: changeParent,
        };
    });
