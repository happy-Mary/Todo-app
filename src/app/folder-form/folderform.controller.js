import folderFormModule from './folderform.module';

export default folderFormModule
.controller('folderFormController', function folderFormController(modalService, listGroupService, listService){
    let self = this;
    self.modal = modalService;
    self.lists = listGroupService;

    self.currData = {title: ''};

    self.addFolder = function(title){
        listGroupService.create(title);
        modalService.close();
    };

    self.editFolder = function(title){
        self.editData.name = title;
        listGroupService.update();
        modalService.close();
    };

    self.cancelChanges = function(){
        self.currData.title = (self.editData == undefined) ? '' : self.editData.name;
        modalService.close();
    };

    self.deleteFolder = function() {
        listGroupService.delete(self.editData.id);
        // change lists id to null
        let lists = listService.get();
        lists.forEach(function(list){
            if (list.listGroupId === self.editData.id) list.listGroupId = null;
        });
        modalService.close();
    };

    self.$onChanges = function(changesObj) { 
        let currListVal = changesObj.editData.currentValue;
        if(currListVal !== undefined && currListVal !== null) {
            self.editData = currListVal;
            // for changing title
            self.currData.title = currListVal.name;
        }   
    };

});