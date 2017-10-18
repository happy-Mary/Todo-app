import todosideModule from './todoside.module';
import '../../sass/todoside.scss';

export default todosideModule.controller('todosideController', ['$state', '$timeout', 'todoService', function todosideController($state, $timeout, todoService) {
    const self = this;
    self.task = todoService.getTodo($state.params.todoid);

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

    self.handleEnterTitle = (event) => {
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

    self.handleSaveFiles = () => {

    }

    self.redirectToParent = () => {
        $state.go('^');
    }

    self.checkFileSupport = () => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            console.log('Great success! All the File APIs are supported.');
        } else {
            console.log('The File APIs are not fully supported in this browser.');
        }
    }

}]);