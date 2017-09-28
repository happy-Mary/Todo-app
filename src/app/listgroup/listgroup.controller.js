import listGroupModule from './listgroup.module';
import '../../sass/listgroup.scss';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http, localStorageService, listGroupService) {
        const self = this;

        function removeSubmenu() {
            const allOpenedMenus = angular.element(document.querySelectorAll('.submenu-open'));
            allOpenedMenus.removeClass('submenu-open');
        }

        self.listGroups = listGroupService.get();
        self.openFolder = (event) => {
            const folderLink = angular.element(event.currentTarget);
            if (folderLink.hasClass('folder-item')) {
                const folderItem = folderLink.parent();
                if (folderItem.hasClass('folder-close')) folderItem.removeClass('folder-close')
                else folderItem.addClass('folder-close')
            }
        };

        self.handleEdit = (itemCurr) => {
            self.onEdit({ item: itemCurr });
        };

        self.handleDelete = (itemCurr) => {
            self.onDelete({ item: itemCurr });
        };

        self.toggleMenuEdit = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const menuEditButton = angular.element(event.currentTarget);
            const currMenu = menuEditButton.parent().next();
            const currMenuStatus = currMenu.hasClass('submenu-open');
            removeSubmenu();
            if (!currMenuStatus) currMenu.addClass('submenu-open');
            self.editMenuActive = !self.editMenuActive;
        };

        const mainCont = angular.element(document.querySelector('.container'));
        mainCont.on('click', () => {
            removeSubmenu();
        });

        self.$onInit = () => {
            self.onEdit = self.onEdit;
            self.onDelete = self.onDelete;
        };
    });