import todosideModule from './todoside.module';
import '../../sass/todoside.scss';
import File from '../files/file.constructor';

export default todosideModule.controller('todosideController', ['$http', 'localStorageService', '$state', '$timeout', 'todoService', 'subtaskService', 'filesService', function todosideController($http, localStorageService, $state, $timeout, todoService, subtaskService, filesService) {
    const self = this;
    self.currTaskId = $state.params.todoid;
    self.task = todoService.getTodo(self.currTaskId);

    self.redirectToParent = () => {
        $state.go('^');
    }

    if (!self.task) {
        self.redirectToParent();
        return;
    }

    self.subtasks = subtaskService.get();
    self.files = filesService.get();
    self.subtaskTitle = "";

    if (self.task.note) {
        self.addNoteActive = true;
    } else {
        self.addNoteActive = false;
    }

    self.changeTodo = todoService.update;
    self.changeSubtask = subtaskService.update;
    self.deleteSubtask = subtaskService.delete;

    self.addSubtask = () => {
        if (self.subtaskTitle) {
            subtaskService.create(self.subtaskTitle, self.currTaskId);
            self.subtaskTitle = "";
        }
    }

    self.changeTodoTitle = (event) => {
        const currEl = angular.element(event.target);
        const newTitle = currEl.html();
        if (newTitle) {
            const currObj = { title: newTitle };
            todoService.update(self.task, currObj);
        } else {
            currEl.html(self.task.title);
        }
    }

    self.handleEnter = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    }

    self.handleNotePrint = (event) => {
        const currEl = event.target;
        $timeout(() => {
            currEl.style = 'height: auto;';
            currEl.style = `height: ${currEl.scrollHeight}px`;
        }, 0);
    }

    self.changeTodoNote = () => {
        if (self.task.note) {
            todoService.update(self.task);
        } else {
            self.addNoteActive = false;
        }
    }

    self.handleFiles = (data) => {
        const files = data;

        angular.forEach(files, (file) => {
            filesService.create(file, self.currTaskId);
        });
    }

     // call for changing loader field
                // $timeout(() => {
                //     const date = new Date();
                //     filesService.setLoaded(currFile.id, date);
                // }, 5000);
                // request to server

    self.$onInit = () => {
        // self.handleNotePrint();
    }

}]);