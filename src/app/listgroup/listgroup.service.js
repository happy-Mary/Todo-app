import listGroupModule from './listgroup.module';
import ListGroup from './listgroup.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default listGroupModule
    .service('listGroupService', function listGroupService($http, localStorageService) {
        const self = this;
        self.data = [];

        function getListGroups() {
            return self.data;
        }

        function registerListGroups() {
            return localStorageService.get(URLS.folderURL).then((response) => {
                self.data = response.data;
            })
        }

        function createListGroup(title) {
            const data = new ListGroup(title);
            localStorageService.set(URLS.folderURL, data).then((response) => {
                self.data.push(response.data);
            })
        }

        function deleteListGroup(id) {
            localStorageService.delete(URLS.folderURL, id).then((response) => {
                const index = self.data.findIndex(folder => folder._id == response.data._id);
                self.data.splice(index, 1);
            })
        }

        function updateListGroup(folder, editedFolder) {
            const currFolder = folder;
            localStorageService.update(URLS.folderURL, currFolder._id, editedFolder)
            .then((response) => {

                angular.forEach(Object.keys(currFolder), (key) => {
                    if (currFolder[key] !== response.data[key]) {
                        currFolder[key] = response.data[key];
                    }
                });

            })
        }

        function getListGroup(id) {
            self.data.forEach((group) => {
                let currgroup;
                if (group.id == id) currgroup = group;
                return currgroup;
            });
        }

        return {
            data: self.data,
            register: registerListGroups,
            get: getListGroups,
            create: createListGroup,
            update: updateListGroup,
            delete: deleteListGroup,
            // ???
            getGroup: getListGroup,
        }
    });
