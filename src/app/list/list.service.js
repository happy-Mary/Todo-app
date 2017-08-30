import listModule from './list.module';

export default listModule
.service('listService', function($filter){
    let data = [];
    
    function getLists(id) {
        // to filter data on route ???
        // to rewrite list
    }

    function setLists(obj) {
        data = obj;
    }

    function deleteList(id) {
        let index = data.findIndex(x => x.id==id);
        data.splice(index, 1);
    }

    function createList(title){
        console.log(`new list TITLE: ${title}`);
        // call constructor, save to data, return data
    }

    return {
        set: setLists,
        get: getLists,
        delete: deleteList,
        create: createList
    };

});

