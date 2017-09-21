import mainModule from './app.module';
import todoService from './todo/todo.service';
import listService from './list/list.service';
import localStorageService from './app.service';
///////////////////////////////////////
import routeServicee from './route.service';

export default mainModule
    .controller('AppController', function AppController(todoService, listGroupService, listService, localStorageService, modalService, $stateParams, $transitions, $state, $timeout) {

        let self = this;
        self.headerTitle = 'current list title';
        self.marked = false;
        self.newTodoTitle = '';
        self.taskFocused = false;
        self.sidebarOpen = true;
        self.currListId = $stateParams.listid;

        let sortMenuEl = null;

        // service to open modal
        self.modal = modalService;

        // getting data for list and listgroups ???
        listGroupService.register();
        listService.register();
        todoService.register();

        angular.element(document).ready(function(event){
            // open folder if list active on first load
             let activeList = angular.element(document.getElementsByClassName('active-list')[0]);
             let targetEl = activeList.parent().parent().parent();
             if(targetEl.hasClass('folder-close')){
                 targetEl.removeClass('folder-close');
             }
             // clouse sort menu if mousleave/show if returns
             let timeoutSortID;
             sortMenuEl = angular.element(document.querySelector('.sort-menu'));
             sortMenuEl.on('mouseleave', function() {

                timeoutSortID = $timeout(function(){
                    sortMenuEl.removeClass('sort-open');
                }, 3000);
              });

              sortMenuEl.on('mouseenter', function(){            
                  $timeout.cancel(timeoutSortID);
              });
         });

        // change main title on route
        $transitions.onSuccess({ to: 'lists.**' }, function(trans) {
            self.currListId = $stateParams.listid;
           
            if(self.currListId !== 'marked'){
                let list = listService.getList(self.currListId);

                // CHANGE AFTER RESOLVING GETTING DATA
                self.headerTitle = (list !== undefined) ? list.title : 'default title';
                // self.headerTitle = list.title;
            } else {
                self.headerTitle = 'избранное';
            }
        });

        // redirect to search while typing
        self.goToSearch = function(){
            $state.go('lists.filter.search', {param: self.searchItem });
        };

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
                todoService.create(newTodo, listId, self.marked);
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

        // ////////////////////////////////
        // SORTING TODOS
        // ////////////////////////////////
        self.toggleSortMenu = function(){
            sortMenuEl.toggleClass('sort-open');
        };
        
        let tasks = todoService.get();
        console.log(tasks);

        self.sorting = {
            byTitle: function(){
                    tasks.sort(function(a, b) {
                    let valueA=a.title.toLowerCase(), valueB=b.title.toLowerCase();
                    sortMenuEl.removeClass('sort-open');
                    return (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
                });
            },

            byMarked: function() {
                    tasks.sort(function(a, b) {
                    let valueA = -a.marked, valueB= -b.marked;
                    sortMenuEl.removeClass('sort-open');
                    return (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
                });
            },
            byDate: function() {
                tasks.sort(function(a, b) {
                    let valueA = new Date(a.date), valueB= new Date(b.date);
                    sortMenuEl.removeClass('sort-open');
                    return (valueA > valueB) ? -1 : (valueA < valueB) ? 1 : 0;
                });

                // testing dates sorting (remove after tests)
                angular.forEach(tasks, function(task){
                    console.log(task.date);
                });
                /////////////////////////////////
            }
        };


    });

