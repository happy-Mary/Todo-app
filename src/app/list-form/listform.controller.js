import listFormModule from './listform.module';

export default listFormModule
    .controller('listFormController', function listFormController(modalService, listService) {
        const self = this;

        self.currData = { title: '' };

        self.addList = function(title) {
            listService.create(title);
            modalService.close();
        };

        self.editList = function(title) {
            self.editData.title = title;
            listService.update();
            modalService.close();
        };

        self.cancelChanges = function() {
            self.currData.title = (self.editData == undefined) ? '' : self.editData.title;
            modalService.close();
        };

        self.deleteList = function() {
            listService.delete(self.editData.id);
            modalService.close();
        };

        self.$onChanges = function(changesObj) {
            const currListVal = changesObj.editData.currentValue;
            if (currListVal !== undefined && currListVal !== null) {
                self.editData = currListVal;
                // for changing title
                self.currData.title = currListVal.title;
            }
        };

    });