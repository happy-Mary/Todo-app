import folderFormModule from './folderform.module';

export default folderFormModule
.controller('folderFormController', function folderFormController(modalService, listGroupService){
    let self = this;
    self.modal = modalService;
    self.lists = listGroupService;

    self.data = {title: ''};

    self.addFolder = function(title){
        listGroupService.create(title);
        modalService.close();
    };

    // change ng-submit on form
    // call localStorage service from listService

    
});