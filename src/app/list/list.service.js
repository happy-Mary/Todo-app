import listModule from './list.module';
import List from './list.constructor';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default listModule
.service('listService', function($http, localStorageService){
    let self  = this;
    self.data;

    function save(){
        localStorageService.set('lists', self.data);
    }

    function registerLists(){
       if(localStorageService.get('lists')){
            self.data = localStorageService.get('lists');
        }
        else{
            $http({ method: 'GET', url: URLS.listURL })
                .then(function successCallback(response) {
                    self.data = response.data;
                    save();
                })
                .catch(function errorCallback() {
                    self.data =  [];
                    save();
                });
        }
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

    function updateList(id, title){
        let listItem = getLists(id);
        listItem.title = title;
        save();
        return data;
    }

    function deleteList(id) {
        let index = self.data.findIndex(x => x.id==id);
        self.data.splice(index, 1);
        save();
        return self.data;
    }

     // function setLists(obj) {
    //     self.data = obj;
    //     save();
    // }

  
    // registerLists();

    return {
        register: registerLists,
        get: getLists,
        getList: getList,
        delete: deleteList,
        create: createList,
        update: updateList,
        save: save    
    };
});

