import listModule from './list.module';
import List from './list.constructor';

export default listModule
.service('listService', function($filter){
    let data = [];
    let currItem;
    
    function getLists(id) {
        // to filter data on route ???
        // to rewrite list
        currItem = $filter("filter")(data, {id:id});
    }

    function updateList(title){
        currItem.title = title;
        console.log(data);
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

