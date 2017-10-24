import listFormModule from './listform.module';

export default listFormModule
    .controller('listFormController', function listFormController(modalService, todoService, listService) {
        const self = this;

        self.currData = { title: '' };

        self.addList = (title) => {
            listService.create(title);
            modalService.close();
            self.currData.title = "";
        };

        self.editList = (title) => {
            self.editData.title = title;
            if (self.editData.type == 'list') {
                listService.update();
            }
            if (self.editData.type == 'todo') {
                todoService.update();
            }
            // listService.update();
            modalService.close();

        };

        self.cancelChanges = () => {
            self.currData.title = (self.editData == undefined) ? '' : self.editData.title;
            modalService.close();
        };

        self.deleteList = () => {
            if (self.editData.type == 'list') {
                 listService.delete(self.editData.id);
            }
            if (self.editData.type == 'todo') {
                 todoService.delete(self.editData.id);
            }
            modalService.close();
        };

        self.$onChanges = (changesObj) => {
            const currListVal = changesObj.editData.currentValue;
            if (currListVal !== undefined && currListVal !== null) {
                self.editData = currListVal;
                // for changing title
                self.currData.title = currListVal.title;
            }
        };

    });