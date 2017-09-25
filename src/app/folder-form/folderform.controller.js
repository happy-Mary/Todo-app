import folderFormModule from './folderform.module';

export default folderFormModule
    .controller('folderFormController', function folderFormController(modalService, listGroupService, listService) {
        const self = this;
        self.modal = modalService;
        self.lists = listGroupService;

        self.currData = { title: '' };

        self.addFolder = (title) => {
            listGroupService.create(title);
            modalService.close();
        };

        self.editFolder = (title) => {
            self.editData.name = title;
            listGroupService.update();
            modalService.close();
        };

        self.cancelChanges = () => {
            self.currData.title = (self.editData == undefined) ? '' : self.editData.name;
            modalService.close();
        };

        self.deleteFolder = () => {
            listGroupService.delete(self.editData.id);
            listService.changeParentFolder(self.editData.id, null);
            modalService.close();
        };

        self.$onChanges = (changesObj) => {
            const currListVal = changesObj.editData.currentValue;
            if (currListVal !== undefined && currListVal !== null) {
                self.editData = currListVal;
                // for changing title
                self.currData.title = currListVal.name;
            }
        };
    });