import mainModule from './app.module';

require('./modal/modal.service');

export default mainModule
    .controller('AppController', function AppController($http, todoService, listGroupService, listService, contextMenuService, localStorageService, modalService, $transitions, $state, $timeout) {
        const self = this;
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
                    self.headerTitle = 'Избранное';
                }
            } else if ($state.params.search !== undefined) {
                self.headerTitle = 'search';
            }
        }

        getMainTitle();

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
            $state.go('filter', { search: self.searchItem }, { notify: false });
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
        self.emptyFolder = { folderId: null };

        self.actions = {
            onEdit(item) {
                if (item) {
                    self.activeItem = item;
                } else {
                    self.activeItem = contextMenuService.getItem();
                }

                switch (self.activeItem.type) {
                    case 'folder':
                        modalService.open('edit-folder');
                        break;
                    case 'list':
                        modalService.open('edit-list');
                        break;
                    case 'todo':
                        modalService.open('edit-todo');
                        break;
                    default: break;
                }
            },
            onDelete(item) {
                if (item) {
                    self.activeItem = item;
                }
                switch (self.activeItem.type) {
                    case 'folder':
                        modalService.open('delete-folder');
                        break;
                    case 'list':
                        modalService.open('delete-list');
                        break;
                    case 'todo':
                        modalService.open('delete-todo');
                        break;
                    default: break;
                }
            },
            onContextMenu(event, item) {
                event.stopPropagation();
                event.preventDefault();
                contextMenuService.set(event, item);
                switch (item.type) {
                    case 'folder':
                        contextMenuService.setState('folder', true);
                        break;
                    case 'list':
                        contextMenuService.setState('list', true);
                        break;
                    case 'todo':
                        contextMenuService.setState('todo', true);
                        break;
                    default: break;
                }
                self.activeItem = contextMenuService.getItem();
            },
            changeTodoMarked(value) {
                self.activeItem.marked = value;
                todoService.update(self.activeItem);
            },
            changeTodoCompleted(value) {
                self.activeItem.completed = value;
                todoService.update(self.activeItem);
            },
            verifyEmptyFolderDrop(dragObj, dropObj) {
                let allow;
                if (dragObj.type === 'list' && dropObj.folderId === null) {
                    allow = true;
                } else {
                    allow = false;
                }
                return allow;
            },
            handleEmptyFolderDrop(dragObj, dropObj) {
                listService.update(dragObj, dropObj);
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
            }
        };
    });