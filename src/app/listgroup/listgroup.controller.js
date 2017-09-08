import listGroupModule from './listgroup.module';
import listGroupService from './listgroup.service';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http, localStorageService, listGroupService) {
        var self = this;
        self.listGroups = listGroupService.get();
  
        self.deleteLisGroup = function(id){
            listGroupService.deleteGroup();
        }
                
        self.folderClose = true;
        self.open = function(event) {

            let folderLink = angular.element(event.currentTarget);

            if (folderLink.hasClass('folder-item')) {
                console.log('We need this link');
                console.log(folderLink);
                let folderItem = folderLink.parent();
                (folderItem.hasClass('folder-close')) ? folderItem.removeClass('folder-close'): folderItem.addClass('folder-close');
            }
        }
        self.deleteLisGroup = function(id) {
            listGroupService.deleteGroup();
            self.save();
        }
      
    });

