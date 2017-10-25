import listGroupModule from './listgroup.module';
import '../../sass/listgroup.scss';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http, localStorageService, listGroupService, listService) {
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

        self.handleContextMenu = (event, item) => {
            const currEvent = event;
            const currItem = item;
            self.onContextMenu({ event: currEvent, item: currItem });
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
            self.onContextMenu = self.onContextMenu;
        };

        self.verifyFolderDrop = (dragObj, dropObj) => {
            let allow;
            if (dragObj.type === 'list' && dropObj.type === 'folder') {
                allow = true;
            } else {
                allow = false;
            }
            return allow;
        };

        self.handleDrop = (dragObj, dropObj) => {
            listService.changeParentFolder(dragObj.listGroupId, dropObj.id, dragObj.id);
        };

        self.getCountLists = listService.getCountLists;

        self.openContextMenu = (event, item) => {
           const currEvent = event;
           const currItem = item;
           self.onContextMenu({ event: currEvent, item: currItem });
        };
    });
