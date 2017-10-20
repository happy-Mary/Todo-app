import fileModule from './file.module';
import getTimeAgo from '../module/getTimeAgo';

export default fileModule.controller('fileController', [function fileController() {
    const self = this;
    
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
    function getExtension() {

    };
    self.extension = getExtension();

}]);