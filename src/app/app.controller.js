import mainModule from './app.module';

export default mainModule
    .controller('AppController', function AppController(modalService) {
        let self = this;
        self.headerTitle = 'current list title';
        self.marked = false;
        self.taskFocused = false;
        // ////////////////////////////////////
        self.modal = modalService;
        // //////////////////////////////////

        self.focusAddTask = function() {
            (self.taskFocused) ? self.taskFocused = false : self.taskFocused = true;
            (self.taskFocused) ? document.querySelector(".newTaskTitle").focus() : document.querySelector(".newTaskTitle").blur();
        };
// ////////////////////////////////////////////////
        // changing menu item
        self.changeActive = function($event) {
            let test = document.querySelector('.folders').querySelectorAll('li');
            test.forEach(function(item) {
                if (item.classList.contains('active-list')) {
                    item.classList.remove('active-list');
                }
            });
            $event.target.parentNode.classList.add('active-list');
        };
    });