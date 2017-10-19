import mainModule from './app.module';

require('./modal/modal.service');

export default mainModule
    .controller('AppController', function AppController(todoService, listGroupService, listService, contextMenuService, localStorageService, modalService, $transitions, $state, $timeout) {
        const self = this;
       // self.headerTitle = 'current list title';
        self.marked = false;
        self.newTodoTitle = '';
        self.taskFocused = false;
        self.sidebarOpen = true;
        let sortMenuEl = null;
        self.currListId = $state.params.listid;

        // service to open modal
        self.modal = modalService;

        // method to get main list title
        function getMainTitle() {
            if ($state.params.listid) {
                if (self.currListId !== 'marked') {
                    const list = listService.getList(self.currListId);
                    if (list) {
                        self.headerTitle = list.title
                    } else {
                        $state.go('lists.todo', { listid: 'marked' });
                    }
                } else {
                    self.headerTitle = 'избранное';
                }
            } else if ($state.params.search !== undefined) {
                self.headerTitle = 'search';
            }
        }

        getMainTitle();

        // getting data for list and listgroups
        todoService.register();

        angular.element(document).ready(() => {
            // open folder if list active on first load
            const activeList = angular.element(document.getElementsByClassName('active-list')[0]);
            const targetEl = activeList.parent().parent().parent();
            if (targetEl.hasClass('folder-close')) {
                targetEl.removeClass('folder-close');
            }
            // clouse sort menu if mousleave/show if returns
            let timeoutSortID;
            sortMenuEl = angular.element(document.querySelector('.sort-menu'));
            sortMenuEl.on('mouseleave', () => {
                timeoutSortID = $timeout(() => {
                    sortMenuEl.removeClass('sort-open');
                }, 3000);
            });
            sortMenuEl.on('mouseenter', () => {
                $timeout.cancel(timeoutSortID);
            });
        });

        // change main title on route
        $transitions.onSuccess({ to: 'lists.**' }, () => {
            self.currListId = $state.params.listid;
            getMainTitle();
        });
     
        // redirect to search while typing
        self.goToSearch = () => {
            $state.go('lists.filter', { search: self.searchItem });
        };

        // focusing input for adding todo
        self.focusAddTask = () => {
            self.taskFocused = true;
            document.querySelector(".newTaskTitle").focus();
        };

        self.toggleFocus = (event) => {
            self.taskFocused = !self.taskFocused;
            if (!self.taskFocused) {
                event.stopPropagation();
            }
        };

        // adding todo
        self.addToDo = () => {
            event.preventDefault();
            const newTodo = self.newTodoTitle.trim();
            if (newTodo) {
                const listId = self.currListId;
                todoService.create(newTodo, listId, self.marked);
            }
            self.newTodoTitle = '';
        };

        // functions for manipulating list, folders, ?todo? data
        self.activeItem = null;

        self.actions = {
            // editting item
            onEdit(item) {
                if(item){
                    self.activeItem = item;
                }
                else{
                    self.activeItem = contextMenuService.getItem();
                }
                if (self.activeItem.type === 'list') {
                    modalService.open('edit-list');
                } else if (self.activeItem.type === 'folder') {
                    modalService.open('edit-folder');
                }
            },
            // deleting item
            onDelete(item) {
                if(item){
                    self.activeItem = item;
                }
                else{
                    self.activeItem = contextMenuService.getItem();
                }
                if (self.activeItem.type === 'list') {
                    modalService.open('delete-list');
                } else if (self.activeItem.type === 'folder') {
                    modalService.open('delete-folder');
                }
            },
            // clicking on item
            onActivate() {

            },
            // opening folder
            onToggleExpand() {

            },
            // opening folder menu (on custom right click)
            onContextMenu(event, item) {
                event.stopPropagation();
                contextMenuService.set(event, item);
                switch(item.type){
                    case 'folder': 
                        contextMenuService.setState('folder', true);
                        break;
                    case 'list':
                        contextMenuService.setState('list', true);
                        break;
                    case 'todo':
                        contextMenuService.setState('list', true);
                        break;
                }                           
            },
            verifyEmptyFolderDrop(dragObj, dropObj) {
                let allow;
                if (dragObj.type === 'list' && dropObj === null) {
                    allow = true;
                } else {
                    allow = false;
                }
                return allow;
            },
            handleEmptyFolderDrop(dragObj, dropObj) {
                listService.changeParentFolder(dragObj.listGroupId, dropObj, dragObj.id);
            }
        };

        // ////////////////////////////////
        // SORTING TODOS
        // ////////////////////////////////
        const tasks = todoService.get();
        self.toggleSortMenu = () => {
            sortMenuEl.toggleClass('sort-open');
        };

        self.sorting = {
            byTitle() {
                tasks.sort((a, b) => {
                    const valueA = a.title.toLowerCase();
                    const valueB = b.title.toLowerCase();
                    sortMenuEl.removeClass('sort-open');

                    if (valueA > valueB) return 1;
                    else if (valueA < valueB) return -1;
                    return 0;
                });
            },

            byMarked() {
                tasks.sort((a, b) => {
                    const valueA = -a.marked;
                    const valueB = -b.marked;
                    sortMenuEl.removeClass('sort-open');

                    if (valueA > valueB) return 1;
                    else if (valueA < valueB) return -1;
                    return 0;
                });
            },
            byDate() {
                tasks.sort((a, b) => {
                    const valueA = new Date(a.date);
                    const valueB = new Date(b.date);
                    sortMenuEl.removeClass('sort-open');

                    if (valueA > valueB) return -1;
                    else if (valueA < valueB) return 1;
                    return 0;
                });

                // testing dates sorting (remove after tests)
                // angular.forEach(tasks, (task) => {
                // console.log(task.date);
                // });
            }
        };

    });