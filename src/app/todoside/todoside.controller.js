import todosideModule from './todoside.module';
import '../../sass/todoside.scss';
import Subtask from './subtask.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default todosideModule.controller('todosideController', ['$state', '$timeout', 'todoService', 'subtaskService', function todosideController($state, $timeout, todoService, subtaskService) {
    const self = this;
    self.currTaskId = $state.params.todoid;
    self.task = todoService.getTodo(self.currTaskId);
    // self.subtasks = subtaskService.getSubtasks(currTaskId);
    self.subtasks = subtaskService.get();
    self.subtaskTitle = "";

    if (self.task.note) {
        self.addNoteActive = true;
    } else {
        self.addNoteActive = false;
    }

    self.changeTodo = todoService.update;

    self.changeTodoTitle = (event) => {
        const currEl = angular.element(event.target);
        self.task.title = currEl.html();
        todoService.update();
    }

    self.addSubtask = () => {
        // не обновляется....
        subtaskService.create(self.subtaskTitle, self.currTaskId);
        self.subtaskTitle = "";
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
            todoService.update();
        } else {
            self.addNoteActive = false;
        }
    }

    self.redirectToParent = () => {
        $state.go('^');
    }

    self.handleFiles = (data) => {
        const files = data;

        angular.forEach(files, (file) => {
            const name = file.name;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const theUrl = event.target.result;
                // console.log(theUrl);
                self.task.files.push(theUrl);
                todoService.update();
            }
        })
    }
}]);

// do we need it on form with files ???
// action="upload-page.php" enctype="multipart/form-data"