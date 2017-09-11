import listModule from './list.module';
import List from './list.constructor';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default listModule
.service('listService', function($http, localStorageService){
    let self  = this;
    // let itemItem;
    function getLists(){
        return self.data;
    }

    function save(){
           localStorageService.set('lists', data);
    }

    function getLists(){
        console.log('11212')
       if(localStorageService.get('lists')){
            data = localStorageService.get('lists');
            return data;
        }
        else{
            $http({ method: 'GET', url: URLS.listURL })
                .then(function successCallback(response) {
                    data = response.data;
                    save();
                    return data;
                     
                })
                .catch(function errorCallback() {
                    data =  [];
                    save();
                    return data;
                });
        }
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
    }

    function updateList(id, title){
        let itemItem = getLists(id)
        itemItem.title = title;
        save();
        return data;
    }

    function setLists(obj) {
        data = obj;
        save();
    }

    function deleteList(id) {
        let index = data.findIndex(x => x.id==id);
        data.splice(index, 1);
        save();
        return data;
    }

    function createList(title, id){
        console.log(`new list TITLE: ${title}`);
        let list = new List(title, id);
        data.push(list);
        save();
        return data;
        // call constructor, save to data, return data
    }
  
    return {
        set: setLists,
        get: getLists,
        getList: getList,
        delete: deleteList,
        create: createList,
        update: updateList,
        save: save    
    };
});

