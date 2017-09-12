import listFormModule from './listform.module';

export default listFormModule
.controller('listFormController', function listFormController(modalService, listService){
    let self = this;

    self.currData = {title: ''};

    self.addList = function(title) {
        listService.create(title);
        modalService.close();
    };

    self.editList = function(title){
        console.log('editing list submit');
        self.editData.title = title;
        listService.update();
        modalService.close();
    };

    self.cancelChanges = function(){
        self.currData.title = (self.editData == undefined) ? '' : self.editData.title;
        modalService.close();
    };

    self.$onChanges = function(changesObj) { 
        let currListVal = changesObj.editData.currentValue;
        if(currListVal !== undefined && currListVal !== null){
            self.editData = currListVal;
            // for changing title
            self.currData.title = currListVal.title;
        }
        
    };
});