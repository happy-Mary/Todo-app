import listFormModule from './listform.module';

export default listFormModule
.controller('listFormController', function listFormController(modalService, listService){
    let self = this;
    self.modal = modalService;
    self.lists = listService;

    self.data = {title: ''};

    self.addList = function(title){
        console.log(title);
        listService.create(title);
        modalService.close();
    };

    self.editList = function(){console.log('editing list submit');};

    // change ng-submit on form
    // call localStorage service from listService
});