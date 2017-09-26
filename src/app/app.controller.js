import mainModule from './app.module';

require('./modal/modal.service');

export default mainModule
    .controller('AppController', function AppController(todoService, listGroupService, listService, localStorageService, modalService, $stateParams, $transitions, $state, $timeout) {
        const self = this;
        // self.headerTitle = 'current list title';
        self.marked = false;
        self.newTodoTitle = '';
        self.taskFocused = false;
        self.sidebarOpen = true;
        self.currListId = $stateParams.listid;
        self.headerTitle = listService.getList(self.currListId).title;

        let sortMenuEl = null;

        // service to open modal
        self.modal = modalService;

        // getting data for list and listgroups ???
        listGroupService.register();
        listService.register();
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
            self.currListId = $stateParams.listid;
            console.log($stateParams);
            if (self.currListId !== 'marked') {
                const list = listService.getList(self.currListId);
                // CHANGE AFTER RESOLVING GETTING DATA
                self.headerTitle = (list !== undefined) ? list.title : 'default title';
                // self.headerTitle = list.title;
            } else {
                self.headerTitle = 'избранное';
            }
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
                const listId = $stateParams.listid;
                todoService.create(newTodo, listId, self.marked);
            }
            self.newTodoTitle = '';
        };

        // functions for manipulating list, folders, ?todo? data
        self.activeItem = null;

        self.actions = {
            // editting item
            onEdit(item) {
                self.activeItem = item;
                if (item.type === 'list') {
                    modalService.open('edit-list');
                } else if (item.type === 'folder') {
                    modalService.open('edit-folder');
                }
            },
            // deleting item
            onDelete(item) {
                self.activeItem = item;
                if (item.type === 'list') {
                    modalService.open('delete-list');
                } else if (item.type === 'folder') {
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
            onContextMenu() {

            }
        };

        // ////////////////////////////////
        // SORTING TODOS
        // ////////////////////////////////
        self.toggleSortMenu = () => {
            sortMenuEl.toggleClass('sort-open');
        };

        const tasks = todoService.get();

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