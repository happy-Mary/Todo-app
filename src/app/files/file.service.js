import fileModule from './file.module';
import File from './file.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default fileModule
    .service('filesService', function Fileservice($http, localStorageService, $q) {
        const self = this;
        self.data = [];

        function getData() {
            return self.data;
        }

        function save() {
            localStorageService.set('files', self.data);
        }

        function registerFiles(id) {
            const taskId = id;
            return localStorageService.getFiltered(URLS.filesURL, taskId).then((response) => {
                self.data = response.data;
            })
        }

        function createFile(name, size, taskId, url) {
            const file = new File(name, size, taskId, url);
            // ???? GET LOADING HERE ????
            // onprogress
            localStorageService.set(URLS.filesURL, file).then((response) => {
                self.data.push(response.data);
            })
        }

        function deleteFile(id) {
            localStorageService.delete(URLS.filesURL, id).then((response) => {
                const index = self.data.findIndex(x => x._id == response.data._id);
                self.data.splice(index, 1);
            })
        }

// ///////////////////////////////////////////////////////////////////////////////////
        function updateFile() {
            save();
        }

        function setFiles(obj) {
            self.data = obj;
        }

        function setLoadedData(id, value) {
            const index = self.data.findIndex(x => x.id == id);
            // self.data[index].loaded = value;
            // self.data[index].name = value;
            save();
        }

        return {
            register: registerFiles,
            get: getData,
            // ///////////////////////////
            create: createFile,
            delete: deleteFile,
            setLoaded: setLoadedData,
            // ///////////////////////////
            update: updateFile,
            set: setFiles
        };
    });