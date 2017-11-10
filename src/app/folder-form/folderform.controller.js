import folderFormModule from './folderform.module';

export default folderFormModule
    .controller('folderFormController', function folderFormController(modalService, listGroupService) {
        const self = this;
        self.modal = modalService;
        self.lists = listGroupService;

        self.currData = {};

        self.addFolder = (currData) => {
            listGroupService.create(currData.title);
            modalService.close();
            self.currData = {};
        };

        self.editFolder = (currData) => {
            listGroupService.update(self.editData, currData);
            modalService.close();
        };

        self.cancelChanges = () => {
            self.currData = (self.editData == undefined) ? {} : self.editData;
            modalService.close();
        };

        self.deleteFolder = () => {
            listGroupService.delete(self.editData._id);
            modalService.close();
        };

        self.$onChanges = (changesObj) => {
            const currListVal = changesObj.editData.currentValue;
            if (currListVal !== undefined && currListVal !== null) {
                self.editData = currListVal;

                angular.forEach(Object.keys(currListVal), (key) => {
                    self.currData[key] = currListVal[key];
                });
            }
        };
    });