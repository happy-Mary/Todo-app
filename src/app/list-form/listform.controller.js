import listFormModule from './listform.module';

export default listFormModule
    .controller('listFormController', function listFormController(modalService, todoService, listService) {
        const self = this;

        self.currData = {};

        self.addList = (currData) => {
            listService.create(currData.title);
            modalService.close();
            self.currData = {};
        };

        self.deleteList = () => {
            if (self.editData.type == 'list') {
                 listService.delete(self.editData._id);
            }
            if (self.editData.type == 'todo') {
                 todoService.delete(self.editData._id);
            }
            modalService.close();
        };

        self.editList = (currData) => {
            if (self.editData.type == 'list') {
                listService.update(self.editData, currData);
            }
            if (self.editData.type == 'todo') {
                todoService.update(self.editData, currData);
            }
            modalService.close();
        };

        self.cancelChanges = () => {
            self.currData = (self.editData == undefined) ? {} : self.editData;
            modalService.close();
        };

        self.$onChanges = (changesObj) => {
            const currListVal = changesObj.editData.currentValue;
            if (currListVal !== undefined && currListVal !== null) {
                self.editData = currListVal;
                // for changing title
                angular.forEach(Object.keys(currListVal), (key) => {
                    self.currData[key] = currListVal[key];
                });
            }
        };
    });