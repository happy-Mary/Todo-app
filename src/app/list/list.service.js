import listModule from './list.module';
import List from './list.constructor';

export default listModule
.service('listService', function(){
    let data = [];
    let itemItem;
    
    function getLists(id) {
        data.forEach(function(item){
            if(item.id == id){
               itemItem = item;
            }
        });
        return itemItem;
    }

    function updateList(title){
        itemItem.title = title;
        return data;
    }

    function setLists(obj) {
        data = obj;
    }

    function deleteList(id) {
        let index = data.findIndex(x => x.id==id);
        data.splice(index, 1);
        return data;
    }

    function createList(title, id){
        console.log(`new list TITLE: ${title}`);
        let list = new List(title, id);
        data.push(list);
        return data;
        // call constructor, save to data, return data
    }

    return {
        set: setLists,
        get: getLists,
        delete: deleteList,
        create: createList,
        update: updateList
    };

});

