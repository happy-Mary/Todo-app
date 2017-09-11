import mainModule from './app.module';
import todoService from './todo/todo.service';
import listService from './list/list.service';
import localStorageService from './app.service';
///////////////////////////////////////
import routeServicee from './route.service';

export default mainModule
    .controller('AppController', function AppController(todoService, $location, listGroupService, listService, localStorageService, modalService, routeService) {

        let self = this;
        self.headerTitle = 'current list title';
        self.marked = false;
        self.newTodoTitle = '';
        self.taskFocused = false;
        // getting data for list and listgroups
        listGroupService.register();
        listService.register();

        // service to open modal
        self.modal = modalService;

        // устанавливаем в главном контроллере объект для работы с роутинг-данными
        self.routeData = {listid: null};
        routeService.set(self.routeData);

        self.addToDo = function(){
            event.preventDefault();
            var newTodo = self.newTodoTitle.trim();

            if(newTodo){
                var urlArray = $location.path().split('/');
                var listId = urlArray[urlArray.length-1];
                console.log(self.marked);
                todoService.create(newTodo, listId, self.marked);
                localStorageService.set('todo', todoService.get());
                self.marked = false;
            }
            self.newTodoTitle = '';
         };
           
        self.focusAddTask = function() {
            (self.taskFocused) ? self.taskFocused = false : self.taskFocused = true;
            (self.taskFocused) ? document.querySelector(".newTaskTitle").focus() : document.querySelector(".newTaskTitle").blur();
        };

        self.onEdit = function(list) {
            if(item.type === 'list') {
                self.activeList = list;
                modalService.open('edit-list');

            }

        }

    });

