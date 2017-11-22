import todoModule from './todo.module';
import ToDo from './todo.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default todoModule
    .service('todoService', function todoService($filter, $http, localStorageService, socket, $stateParams) {
        const self = this;
        self.data = [];

        socket.on('removed_tasks', () => {
            self.data.length = 0;
            console.log('socket works');
        });

        function deleteByIndex(obj) {
            const index = self.data.findIndex(item => item._id == obj._id);
            self.data.splice(index, 1);
        }

        function getData() {
            return self.data;
        }

        function registerTodo(id) {
            const listId = id;
            return localStorageService.getFiltered(URLS.taskURL, listId).then((response) => {
                self.data = response.data;
                return true;
            }).catch((response) => {
                const error = response.status;
                return false;
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
                if ($stateParams.listid === 'marked' && currTask.marked === false) {
                    deleteByIndex(currTask);
                }
            })
        }

        //  we use it in todoside
        function getOneTodo(id) {
            let currItem;
            angular.forEach(self.data, (item) => {
                if (item._id == id) {
                    currItem = item;
                }
            });
            return currItem;
        }

        return {
            get: getData,
            register: registerTodo,
            delete: deleteTodo,
            create: createTodo,
            update: updateTodo,
            getTodo: getOneTodo
        };
    });
