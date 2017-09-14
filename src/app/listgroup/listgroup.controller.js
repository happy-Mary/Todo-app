import listGroupModule from './listgroup.module';
import listGroupService from './listgroup.service';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http, localStorageService, listGroupService) {
        var self = this;
        self.listGroups = listGroupService.get();

        self.editMenuActive = false;
        
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
            self.editMenuActive = false;
            self.onEdit({item: item});
        };

        self.handleDelete = function(item) {
            self.editMenuActive = false;
            self.onDelete({item: item});
        };

        self.clickM = function(){
            console.log('clicked item');
        };

        self.toggleMenuEdit = function(event){
            event.preventDefault();
            event.stopPropagation();
            // change showing sub-menu
            let menuEditLink = angular.element(event.currentTarget);
            console.log(menuEditLink.parent().find('.edit-folder-menu'));
            self.editMenuActive = !self.editMenuActive;
        };

        self.$onInit = function() { 
            self.onEdit = self.onEdit;
            self.onDelete = self.onDelete; 
        };
        
    });

      


