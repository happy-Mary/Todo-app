import listGroupModule from './listgroup.module';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http, localStorageService, listGroupService) {
        const self = this;

        function removeSubmenu() {
            const allOpenedMenus = angular.element(document.querySelectorAll('.submenu-open'));
            allOpenedMenus.removeClass('submenu-open');
        }

        self.listGroups = listGroupService.get();
        self.openFolder = function(event) {
            const folderLink = angular.element(event.currentTarget);
            if (folderLink.hasClass('folder-item')) {
                const folderItem = folderLink.parent();
                (folderItem.hasClass('folder-close')) ? folderItem.removeClass('folder-close'): folderItem.addClass('folder-close');
            }
        };

        self.handleEdit = function(itemCurr) {
            self.onEdit({ item: itemCurr });
        };

        self.handleDelete = function(itemCurr) {
            self.onDelete({ item: itemCurr });
        };

        self.toggleMenuEdit = function(event) {
            event.preventDefault();
            event.stopPropagation();
            const menuEditButton = angular.element(event.currentTarget);
            const currMenu = menuEditButton.parent().next();
            const currMenuStatus = currMenu.hasClass('submenu-open');
            removeSubmenu();
            (!currMenuStatus) ? currMenu.addClass('submenu-open'): '';
            self.editMenuActive = !self.editMenuActive;
        };

        const mainCont = angular.element(document.querySelector('.container'));
        mainCont.on('click', () => {
            removeSubmenu();
        });

        self.$onInit = function() {
            self.onEdit = self.onEdit;
            self.onDelete = self.onDelete;
        };
    });