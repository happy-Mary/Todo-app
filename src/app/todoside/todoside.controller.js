import todosideModule from './todoside.module';
import '../../sass/todoside.scss';

export default todosideModule.controller('todosideController', ['$state', '$timeout', 'todoService', 'subtaskService', function todosideController($state, $timeout, todoService, subtaskService) {
    const self = this;
    self.currTaskId = $state.params.todoid;
    self.task = todoService.getTodo(self.currTaskId);
    self.subtasks = subtaskService.get();
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
            // const name = file.name;
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const theUrl = event.target.result;
                console.log(theUrl);

                self.task.files.push(theUrl);
                todoService.update();
            }
        })
    }

    // REMINDERS AND DATES TEST VERSION
    self.example = {
        value: new Date(2010, 11, 28, 14, 57)
    };

 
    const taskDate = new Date(self.task.date);
    console.log(taskDate.toLocaleDateString());

    // function timeAgo(date) {
    //     const seconds = Math.floor((new Date() - date) / 1000);
    //     let result;
    //     if (Math.round(seconds / (60  *  60  *  24  *  365.25)) >= 2) {
    //         let param = Math.round(seconds / (60 * 60 * 24 * 365.25));
    //         result =  param  + " years ago";
    //      }
    //     else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1) return "1 year ago";
    //     else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2) return Math.round(seconds / (60 * 60 * 24 * 30.4)) + " months ago";
    //     else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1) return "1 month ago";
    //     else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2) return Math.round(seconds / (60 * 60 * 24 * 7)) + " weeks ago";
    //     else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) return "1 week ago";
    //     else if (Math.round(seconds / (60 * 60 * 24)) >= 2) return Math.round(seconds / (60 * 60 * 24)) + " days ago";
    //     else if (Math.round(seconds / (60 * 60 * 24)) >= 1) return "1 day ago";
    //     else if (Math.round(seconds / (60 * 60)) >= 2) return Math.round(seconds / (60 * 60)) + " hours ago";
    //     else if (Math.round(seconds / (60 * 60)) >= 1) return "1 hour ago";
    //     else if (Math.round(seconds / 60) >= 2) return Math.round(seconds / 60) + " minutes ago";
    //     else if (Math.round(seconds / 60) >= 1) return "1 minute ago";
    //     else if (seconds >= 2) return seconds + " seconds ago";
    //     else return seconds + "1 second ago";
    // }

    // console.log(timeAgo(taskDate));


    // //////////////////////////////
}]);

// do we need it on form with files for server ???
// action="upload-page.php" enctype="multipart/form-data"