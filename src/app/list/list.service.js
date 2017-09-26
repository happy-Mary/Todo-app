import listModule from './list.module';
import List from './list.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default listModule
    .service('listService', function listService($http, localStorageService) {
        const self = this;
        self.data = [];

        function save() {
            localStorageService.set('lists', self.data);
        }

        function registerLists() {
            self.data = [];
            return localStorageService.get('lists').then((response) => {
                    self.data.push(...response);
                    save();
                })
                .catch(() => {
                    $http({ method: 'GET', url: URLS.listURL })
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

        function getLists() {
            return self.data;
        }

        function getOnlyList(id) {
            let list;
            angular.forEach(self.data, (item) => {
                if (item.id == id) {
                    list = item;
                }
            });
            return list;
        }

        function createList(title, id) {
            const list = new List(title, id);
            self.data.push(list);
            save();
        }

        function updateList() {
            save();
        }

        function deleteList(id) {
            const index = self.data.findIndex(x => x.id == id);
            self.data.splice(index, 1);
            save();
        }

        function changeParent(currId, newId) {
            angular.forEach(self.data, (item) => {
                const list = item;
                if (list.listGroupId === currId) list.listGroupId = newId;
            });
            save();
        }

        return {
            register: registerLists,
            update: updateList,
            create: createList,
            delete: deleteList,
            get: getLists,
            changeParentFolder: changeParent,
            getList: getOnlyList,
        };
    });