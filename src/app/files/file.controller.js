import fileModule from './file.module';
import getTimeAgo from '../module/getTimeAgo';

export default fileModule.controller('fileController', ['filesService', function fileController(filesService) {
    const self = this;
    //ВРЕМЕННО
    self.loader = 40;

    self.deleteFile = filesService.delete;

    self.$onInit = () => {
        self.file = self.file;
        if (self.file.loaded) {
            const date = new Date(self.file.loaded);
            // put on changing...
            self.loadedTime = getTimeAgo(date);
        }
        self.extension = self.file.name.split('.');
        self.extension = self.extension[self.extension.length - 1];
    };

    // self.$onChanges = (changesObj) => {
        // self.loader = countLoader(self.file.loader);
    // }

    // function countLoader(loader) {
    // 	return loader* 100 / self.file.size;
    // }
}]);