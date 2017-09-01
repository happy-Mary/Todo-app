import mainModule from './app.module';

export default mainModule
    .controller('AppController', function AppController() {
        let self = this;
        self.hello = "HELLO, our TODO App started =)";
        self.headerTitle = 'current list title';
        self.marked = false;
        self.taskFocused = false;
        
        self.focusAddTask = function(){
            (self.taskFocused) ? self.taskFocused=false : self.taskFocused=true;
            (self.taskFocused) ? document.querySelector(".newTaskTitle").focus() : document.querySelector(".newTaskTitle").blur();
        };

        
        
    });