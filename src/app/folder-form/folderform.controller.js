import folderFormModule from './folderform.module';

export default folderFormModule
    .controller('folderFormController', function folderFormController(modalService, listGroupService, listService) {
        const self = this;
        self.modal = modalService;
        self.lists = listGroupService;

        self.currData = {};

        self.addFolder = (title) => {
            listGroupService.create(title);
            modalService.close();
            self.currData = {};
        };

        self.editFolder = (currData) => {
            listGroupService.update(self.editData, currData);
            modalService.close();
        };

        self.cancelChanges = () => {
            self.currData.title = (self.editData == undefined) ? '' : self.editData.name;
            modalService.close();
        };

        self.deleteFolder = () => {
            listGroupService.delete(self.editData._id);
            // it works on server ??? in deleting folder
            listService.changeParentFolder(self.editData._id, null);
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