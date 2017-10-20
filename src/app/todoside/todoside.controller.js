import todosideModule from './todoside.module';
import '../../sass/todoside.scss';

export default todosideModule.controller('todosideController', ['$state', '$timeout', 'todoService', 'subtaskService', 'filesService', function todosideController($state, $timeout, todoService, subtaskService, filesService) {
    const self = this;
    self.currTaskId = $state.params.todoid;
    self.task = todoService.getTodo(self.currTaskId);
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

    self.addSubtask = () => {
        subtaskService.create(self.subtaskTitle, self.currTaskId);
        self.subtaskTitle = "";
    }

    self.deleteSubtask = (subtask) => {
        subtaskService.delete(subtask.id)
    }

    self.changeTodoTitle = (event) => {
        const currEl = angular.element(event.target);
        self.task.title = currEl.html();
        todoService.update();
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
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const theUrl = event.target.result;
                // delete this loaded after server ready
                
                const currFile = filesService.create(self.currTaskId, theUrl, file.name, file.size);
                // $timeout(() => {
                //     const date = new Date();
                //     filesService.setLoaded(currFile.id, date);
                // }, 5000);
                // request to server
            }
        })
    }

}]);

// do we need it on form with files for server ???
// action="upload-page.php" enctype="multipart/form-data"