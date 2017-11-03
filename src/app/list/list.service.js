import listModule from './list.module';
import List from './list.constructor';
// import { URLS } from '../constants';
import URLS from '../constants';

export default listModule
    .service('listService', function listService($http, localStorageService, socket, $state) {
        const self = this;
        self.data = [];

        socket.on('ungroup_lists', (data) => {
            angular.forEach(Object.keys(data), (key) => {
                if (self.data[key] !== data[key]) {
                    self.data[key] = data[key];
                }
            });
        });

        function getLists() {
            return self.data;
        }

        function registerLists() {
            return localStorageService.get(URLS.listURL).then((response) => {
                self.data = response.data;
            })
        }

        function createList(title, id) {
            const list = new List(title, id);
            localStorageService.set(URLS.listURL, list).then((response) => {
                self.data.push(response.data);
            })
        }

        function deleteList(id) {
            localStorageService.delete(URLS.listURL, id).then((response) => {
                const index = self.data.findIndex(list => list._id == response.data._id);
                self.data.splice(index, 1);
                // changing state
                const nextList = self.data[index];
                if (nextList) {
                    $state.go('lists', { listid: nextList._id });
                } else {
                    $state.go('lists', { listid: 'marked' });
                }
            })
        }

        function updateList(list, editedlist) {
            const currList = list;
            localStorageService.update(URLS.listURL, currList._id, editedlist)
            .then((response) => {
                angular.forEach(Object.keys(currList), (key) => {
                    if (currList[key] !== response.data[key]) {
                        currList[key] = response.data[key];
                    }
                });
            })
        }

        function getOnlyList(id) {
            let list;
            angular.forEach(self.data, (item) => {
                if (item._id == id) {
                    list = item;
                }
            });
            return list;
        }

        // function getCountListsInFolder(folderId) {
        //     function getListsInFolder(item) {
        //         return (item.folderId == folderId);
        //     }
        //     const lists = self.data.filter(getListsInFolder);
        //     return lists.length;
        // }

        return {
            register: registerLists,
            get: getLists,
            create: createList,
            update: updateList,
            delete: deleteList,
            // //////////////////////////////
            getList: getOnlyList,
            // getCountLists: getCountListsInFolder
        };
    });
