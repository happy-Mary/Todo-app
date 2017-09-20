import mainModule from './app.module';
import todoService from './todo/todo.service';
import listService from './list/list.service';
import localStorageService from './app.service';
///////////////////////////////////////
import routeServicee from './route.service';

export default mainModule
    .controller('AppController', function AppController(todoService, listGroupService, listService, localStorageService, modalService, $stateParams, $transitions, $state) {

        let self = this;
        self.headerTitle = 'current list title';
        self.marked = false;
        self.newTodoTitle = '';
        self.taskFocused = false;
        self.sidebarOpen = true;

        // getting data for list and listgroups ???
        listGroupService.register();
        listService.register();
        todoService.register();

        self.currListId = $stateParams.listid;

        $transitions.onSuccess({ to: 'lists.**' }, function(trans) {
            let id = $stateParams.listid;
            if(id !== 'marked'){
                let list = listService.getList(id);
                self.headerTitle = list.title;
            } else {
                self.headerTitle = 'избранное';
            }
        });

        angular.element(document).ready(function(event){
            let activeList = angular.element(document.getElementsByClassName('active-list')[0]);
            let targetEl = activeList.parent().parent().parent();
            if(targetEl.hasClass('folder-close')){
                targetEl.removeClass('folder-close');
            }
        });

        self.goToSearch = function(){
            $state.go('filter.search', {param: self.searchItem });
        };

        // service to open modal
        self.modal = modalService;

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
                let listId = $stateParams.listid;
                todoService.create(newTodo, listId);
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
            // opening folder menu (on custom right click)
            onContextMenu: function(){

            }
        };

        
    });

