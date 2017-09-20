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

        self.currListId = $stateParams.listid;

        $transitions.onSuccess({ to: 'lists.**' }, function(trans) {
            self.currListId = $stateParams.listid;
            if(self.currListId !== 'marked'){
                let list = listService.getList(self.currListId);
                self.headerTitle = list.title;
            } else {
                self.headerTitle = 'избранное';
            }
        });

        // ??????????????????
        let sortMenuEl = null;
        // ??????????????????
        angular.element(document).ready(function(event){
            let activeList = angular.element(document.getElementsByClassName('active-list')[0]);
            let targetEl = activeList.parent().parent().parent();
            if(targetEl.hasClass('folder-close')){
                targetEl.removeClass('folder-close');
            }
            // ??????????????????
            sortMenuEl = angular.element(document.querySelector('.sort-menu'));
            // ??????????????????
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
            console.log(sortMenuEl);
            sortMenuEl.toggleClass('sort-open');
        };
        
        self.sorting = {
            byTitle: function(){

            },

            byMarked: function() {

            },

            byDate: function() {

            }
        };

        self.customSort = function(parameter) {
            var parameter = parameter;
            
            let tasks = todoService.get();

            let typeSort = typeof(tasks[0][parameter]);

            tasks.sort(function(a, b) {
                var nameA, nameB;
                if(typeSort == 'string'){
                    nameA=a[parameter].toLowerCase(), nameB=b[parameter].toLowerCase();
                } else {
                    nameA= -a[parameter], nameB= -b[parameter];
                }
                return (nameA > nameB) ? 1 : (nameA < nameB) ? -1 : 0;
            });
        };

   
        // localStorageService.set('dates', []);
        function makeDate(){
            var dates = localStorageService.get('dates');
            // var date = Date.parse(new Date());
            var date = new Date();
            dates.push(date);
            localStorageService.set('dates', dates);
        }
        // makeDate();
        function showDates(){
            var dates = localStorageService.get('dates');
            // var dates =  ["2017-07-20T13:19:09.806Z", "2017-09-20T13:19:19.486Z", "2016-09-20T14:12:57.895Z", "2017-02-20T14:14:14.955Z", "2015-03-10T14:15:25.194Z", "2019-09-20T14:19:33.831Z", "2021-09-20T14:19:36.174Z"]
    
            angular.forEach(dates, function(date, index){
                dates[index] = new Date(date);
            });

            console.log('sorted');
            dates.sort(function (date1, date2) {
                var date1 = new Date(date1);
                var date2 = new Date(date2);
                if (date1 > date2) return -1;
                if (date1 < date2) return 1;
                return 0;
              });
              angular.forEach(dates, function(date){
                console.log(date);
            });
        }

        showDates();
 
    });

