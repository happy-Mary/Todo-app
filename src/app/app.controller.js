import mainModule from './app.module';
import todoService from './todo/todo.service';
import listService from './list/list.service';
import localStorageService from './app.service';
///////////////////////////////////////
import routeServicee from './route.service';

export default mainModule
    .controller('AppController', function AppController(todoService, listGroupService, listService, localStorageService, modalService, routeService) {

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
        // after ui-router change it and remove the RouteService
        self.routeData = {listid: null};
        routeService.set(self.routeData);

        // focusing input for adding todo
        self.focusAddTask = function(event) {
            self.taskFocused = true;
            document.querySelector(".newTaskTitle").focus();
        };

       self.toggleFocus = function(event){
            (self.taskFocused) ? self.taskFocused = false : self.taskFocused = true;
            if(!self.taskFocused){
               event.stopPropagation();
            }
        };

        // adding todo
        self.addToDo = function(){
            event.preventDefault();
            var newTodo = self.newTodoTitle.trim();

            if(newTodo){
                let routeData = routeService.get();
                let listId = routeData.listid;
                todoService.create(newTodo, listId, self.marked);
                // localStorageService.set('todo', todoService.get());
                self.marked = false;
            }
            self.newTodoTitle = '';
         };
 
        // functions for manipulating list, folders, ?todo? data
        self.activeItem = null;

        self.actions = {
            // editting item
            onEdit: function(item) { 
                self.activeItem = item;
                if(item.type === 'list') {
                    modalService.open('edit-list');
                } else if(item.type === 'folder'){
                    modalService.open('edit-folder');
                }
            },
            // deleting item
            onDelete: function(item) {
                self.activeItem = item;
                 if(item.type === 'list') {
                    modalService.open('delete-list');
                } else if(item.type === 'folder'){
                    modalService.open('delete-folder');
                }
            },
            // clicking on item
            onActivate: function(){

            },
            // opening folder
            onToggleExpand: function(){

            },
            // opening folder menu (custom right click)
            onContextMenu: function(){

            }
        };


        

    });

