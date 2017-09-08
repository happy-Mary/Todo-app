import listGroupModule from './listgroup.module';
import listGroupService from './listgroup.service';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http, localStorageService, listGroupService) {
        var self = this;
        self.listGroups = listGroupService.get();
  
        self.open = function(event){
            var folder = angular.element(event.currentTarget);
            folder.parent().children().removeClass('active')
            folder.addClass('active');
        }
     
        self.deleteLisGroup = function(id){
            listGroupService.deleteGroup();
        }
                
    });

