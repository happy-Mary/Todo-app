import mainModule from './app.module';
import todoService from './todo/todo.service';
import listService from './list/list.service';
import localStorageService from './app.service';

export default mainModule
    .controller('AppController', function AppController(todoService, $location, listService, localStorageService) {
        let self = this;
        self.headerTitle = 'current list title';
        self.marked = false;
        self.taskFocused = false;

        
        self.focusAddTask = function(){
            (self.taskFocused) ? self.taskFocused = false : self.taskFocused = true;
            (self.taskFocused) ? document.querySelector(".newTaskTitle").focus() : document.querySelector(".newTaskTitle").blur();
        };

        document.querySelector('main form').addEventListener('submit', function(event){
            event.preventDefault();
            document.querySelector('.newTaskTitle').blur();

        });

        self.addToDo = function(){
            // event.preventDefault();
             var input = angular.element(document.querySelector('.newTaskTitle'));
             var newTodo = input.val().trim();
            
             if(newTodo){
                console.log(newTodo);
                var urlArray = $location.path().split('/');
                var listId = urlArray[urlArray.length-1];
                var todo = todoService.create(newTodo, listId);
                localStorageService.set('todo', todoService.get());
                listService.addTodo(listId, todo.id);
                localStorageService.set('lists', listService.get());

             }
             input.val('');
         }
           
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

