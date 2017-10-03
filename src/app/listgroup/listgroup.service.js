import listGroupModule from './listgroup.module';
import ListGroup from './listgroup.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default listGroupModule
    .service('listGroupService', function listGroupService($http, localStorageService) {
        const self = this;
        self.data = [];

        function save() {
            localStorageService.set('listGroups', self.data);
        }

        function registerListGroups() {
            localStorageService.get('listGroups').then((response) => {
                    self.data.push(...response);
                    save();
                })
                .catch(() => {
                    $http({ method: 'GET', url: URLS.listGroupURL })
                        .then((response) => {
                            self.data.push(...response.data);
                            save();
                        })
                        .catch(() => {
                            self.data = [];
                            save();
                        });
                });
        }

        function getListGroups() {
            return self.data;
        }

        function updateListGroup() {
            save();
        }

        function getListGroup(id) {
            self.data.forEach((group) => {
                let currgroup;
                if (group.id == id) currgroup = group;
                return currgroup;
            });
        }

        function deleteListGroup(id) {
            const index = self.data.findIndex(group => group.id == id);
            self.data.splice(index, 1);
            save();
        }

        function createListGroup(name) {
            const data = new ListGroup(name);
            self.data.push(data);
            save();
        }

        return {
            register: registerListGroups,
            get: getListGroups,
            data: self.data,
            create: createListGroup,
            update: updateListGroup,
            delete: deleteListGroup,
            getGroup: getListGroup,
        }
    });
