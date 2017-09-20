import listModule from './list.module';
import List from './list.constructor';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default listModule
.service('listService', function($http, localStorageService){
    let self  = this;
    self.data;

    // ? change to let save = , remove from return
    function save(){
        localStorageService.set('lists', self.data);
    }
    
    function registerLists(){
        localStorageService.get('lists').then(function successCallback(response){
            self.data = response;
            console.log(self.data);
            save();
        })
        .catch(function(){
             $http({ method: 'GET', url: URLS.listURL })
                .then(function successCallback(response) {
                    self.data = response.data;
                    save();
                    console.log('got data from server');
                })
                .catch(function errorCallback() {
                    self.data =  [];
                    save();
                });
        })
    }            

    function getLists(){
        return self.data;
    }

    function getList(id) {
        var list;
        self.data.forEach(function(item){
            if(item.id == id){
                list = item;
            }
        });
        return list;
    }

    function createList(title, id){
        let list = new List(title, id);
        self.data.push(list);
        save();
    }

    function updateList(){
        save();
    }

    function deleteList(id) {
        let index = self.data.findIndex(x => x.id==id);
        self.data.splice(index, 1);
        save();
    }

    function changeParentFolder(currId, newId){
        self.data.forEach(function(list){
            if (list.listGroupId === currId) list.listGroupId = newId;
        });
        save();
    }

     function setLists(obj) {
        self.data = obj;
        save();
    }

    return {
        register: registerLists,
        update: updateList,
        create: createList,
        delete: deleteList,
        get: getLists,
        changeParentFolder: changeParentFolder,
        getList: getList,
        // // //
        save: save    
    };
});

