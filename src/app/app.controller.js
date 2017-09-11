import mainModule from './app.module';
import todoService from './todo/todo.service';
import listService from './list/list.service';
import localStorageService from './app.service';

export default mainModule
    .controller('AppController', function AppController(todoService, $location, listService, localStorageService) {
        let self = this;
        self.headerTitle = 'current list title';
        self.marked = false;
        self.newTodoTitle = '';
        self.taskFocused = false;
        self.abcd='ssa';
        self.focus = false;
        
        // self.focusAddTask = function(){
        //     (self.taskFocused) ? self.taskFocused = false : self.taskFocused = true;
        //     (self.taskFocused) ? document.querySelector(".newTaskTitle").focus() : document.querySelector(".newTaskTitle").blur();
        // };

        self.addToDo = function(){
            event.preventDefault();
            var newTodo = self.newTodoTitle.trim();

            if(newTodo){
                var urlArray = $location.path().split('/');
                var listId = urlArray[urlArray.length-1];
                // console.log(self.marked)
                todoService.create(newTodo, listId, self.marked);
                localStorageService.set('todo', todoService.get());
                self.marked = false;
            }
            self.newTodoTitle = '';
         }
           
        self.focusAddTask = function(event) {
        //     (self.taskFocused) ? self.taskFocused = false : self.taskFocused = true;
        //     (self.taskFocused) ? document.querySelector(".newTaskTitle").focus() : document.querySelector(".newTaskTitle").blur();
        // };
            event.preventDefault();
            self.taskFocused = true;
            console.log(self.taskFocused)
            console.log(event.currentTarget);
            document.querySelector(".newTaskTitle").focus();
        }

        //по-нормальному не хочет работать, поэтому так
        self.toggleFocus = function(event){
            event.preventDefault();
            (self.taskFocused) ? self.taskFocused = false : self.taskFocused = true;
            console.log('a' + self.taskFocused)
            // if(self.taskFocused){
            //    self.focusAddTask(event);
            // }
        }


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

