import mainModule from './app.module';

export default mainModule
    .controller('AppController', function AppController($location) {
        let self = this;
        self.hello = "HELLO, our TODO App started =)";
        self.headerTitle = 'current list title';
        self.marked = false;
        self.taskFocused = false;
        
        var urlArray = $location.path().split('/');
        self.currRoute = urlArray[urlArray.length-1];
        // console.log(self.currRoute);

      
        
        self.focusAddTask = function(){
            (self.taskFocused) ? self.taskFocused=false : self.taskFocused=true;
            (self.taskFocused) ? document.querySelector(".newTaskTitle").focus() : document.querySelector(".newTaskTitle").blur();
        };

        let marked = document.querySelector('.marked');
        self.makeClick = function(){
            document.querySelectorAll('li').forEach(function(item){
                if(item.classList.contains('active-list')){
                    item.classList.remove('active-list');
                }
            });
            marked.classList.add('active-list');
        };

    });