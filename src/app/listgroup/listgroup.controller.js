import listGroupModule from './listgroup.module';
import listGroupService from './listgroup.service';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http, localStorageService, listGroupService) {
        var self = this;
        self.listGroups = listGroupService.get();
        self.openFolder = function(event) {
        let folderLink = angular.element(event.currentTarget);
            if (folderLink.hasClass('folder-item')) {
                let folderItem = folderLink.parent();
                (folderItem.hasClass('folder-close')) ? folderItem.removeClass('folder-close'): folderItem.addClass('folder-close');
            }
        };

        self.deleteLisGroup = function(id){
            listGroupService.deleteGroup();
        };

        self.handleEdit = function(item) {
            self.onEdit({item: item});
        };

        self.handleDelete = function(item) {
            self.onDelete({item: item});
        };

        self.toggleMenuEdit = function(event){
            event.preventDefault();
            event.stopPropagation();
            let menuEditButton = angular.element(event.currentTarget);
            let currMenu = menuEditButton.parent().next();
            let currMenuStatus = currMenu.hasClass('submenu-open');
            removeSubmenu();
            (!currMenuStatus) ? currMenu.addClass('submenu-open') : '';
            self.editMenuActive = !self.editMenuActive;
        };

        let mainCont = angular.element(document.querySelector('.container'));
        mainCont.on('click', function(){
            removeSubmenu();
        });

        function removeSubmenu(){
            let allOpenedMenus = angular.element(document.querySelectorAll('.submenu-open'));
            allOpenedMenus.removeClass('submenu-open');
        }

        self.$onInit = function() { 
            self.onEdit = self.onEdit;
            self.onDelete = self.onDelete; 
        };
        
    });

      


