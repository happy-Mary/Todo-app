import fileModule from './file.module';
import File from './file.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default fileModule
    .service('filesService', function Fileservice($http, localStorageService) {
        const self = this;
        self.data = [];

        function getData() {
            return self.data;
        }

        function save() {
            localStorageService.set('files', self.data);
        }

        function getDataFromSerever() {
            return $http({ method: 'GET', url: URLS.filesURL })
                .then((response) => {
                    self.data = [];
                    self.data.push(...response.data);
                    save();
                })
                .catch(() => {
                    self.data = [];
                    save();
                });
        }

        function registerFiles() {
            return localStorageService.get('files').then((response) => {
                    self.data = [];
                    self.data.push(...response);
                    save();
                })
                .catch(() => getDataFromSerever());
        }

        function updateFile() {
            save();
        }

        function setFiles(obj) {
            self.data = obj;
        }

        function deleteFile(id) {
            const index = self.data.findIndex(x => x.id == id);
            self.data.splice(index, 1);
            save();
        }

        function createFile(taskId, url, name, size) {
            const file = new File(taskId, url, name, size);
            self.data.push(file);
            save();
            return file;
        }

        function setLoadedData(id, value) {
            const index = self.data.findIndex(x => x.id == id);
            // self.data[index].loaded = value;
            // self.data[index].name = value;
            save();
        }

        return {
            register: registerFiles,
            set: setFiles,
            get: getData,
            delete: deleteFile,
            create: createFile,
            update: updateFile,
            setLoaded: setLoadedData
        };
    });