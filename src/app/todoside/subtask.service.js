import todosideModule from './todoside.module';
import Subtask from './subtask.constructor';
import URLS from '../constants';

export default todosideModule
    .service('subtaskService', function subtaskService($http, localStorageService) {
        const self = this;
        self.data = [];

        function getData() {
            return self.data;
        }

        function registerSubtasks(id) {
            const taskId = id;
            return localStorageService.getFiltered(URLS.subtaskURL, taskId).then((response) => {
                self.data = response.data;
                return true;
            })
        }

        function createSubtask(title, taskId) {
            const subtask = new Subtask(title, taskId);
            localStorageService.set(URLS.subtaskURL, subtask).then((response) => {
                self.data.push(response.data);
            })
        }

        function deleteSubtask(id) {
            localStorageService.delete(URLS.subtaskURL, id).then((response) => {
                const index = self.data.findIndex(x => x._id == response.data._id);
                self.data.splice(index, 1);
            })
        }

        function updateSubtask(subtask, editedData) {
            const currTask = subtask;
            const editedTask = editedData || subtask;
            localStorageService.update(URLS.subtaskURL, currTask._id, editedTask)
            .then((response) => {
                angular.forEach(Object.keys(currTask), (key) => {
                    if (currTask[key] !== response.data[key]) {
                        currTask[key] = response.data[key];
                    }
                });
            })
        }

        return {
            register: registerSubtasks,
            get: getData,
            delete: deleteSubtask,
            create: createSubtask,
            update: updateSubtask
        };
    });