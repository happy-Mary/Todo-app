import mainModule from './app.module';

export default mainModule
    .controller('AppController', function AppController($location) {
        let self = this;
        self.hello = "HELLO, our TODO App started =)";
        self.headerTitle = 'current list title';
        self.marked = false;
        self.taskFocused = false;

        self.focusAddTask = function(){
            (self.taskFocused) ? self.taskFocused=false : self.taskFocused=true;
            (self.taskFocused) ? document.querySelector(".newTaskTitle").focus() : document.querySelector(".newTaskTitle").blur();
        };
        
        var urlArray = $location.path().split('/');
        self.currPath = urlArray[urlArray.length-1];
        // console.log(self.currRoute);
        console.log($location.path());

        
        // changing menu item 
        self.changeActive = function($event){
            let test = document.querySelector('.folders').querySelectorAll('li');
            test.forEach(function(item){
            
                if(item.classList.contains('active-list')){
                    console.log(item.$ctrl);
                    item.classList.remove('active-list');
                }
            });
            $event.target.parentNode.classList.add('active-list');
        };

    });