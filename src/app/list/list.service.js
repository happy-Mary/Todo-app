import listModule from './list.module';
import List from './list.constructor';

export default listModule
.service('listService', function(){
    let self  = this;
    let data = [];
    // let itemItem;
    function getLists(){
        return data;
    }
    function getList(id) {
        var list;
        data.forEach(function(item){
            if(item.id == id){
                list = item;
            }
        });
        return list;
    }

    function updateList(id, title){
        let itemItem = getLists(id)
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
    function addTodo(id, todoId){
        var list =  getList(id);
        if(list){
            list.todoLists.push(todoId);
        }            
    }

    return {
        set: setLists,
        get: getLists,
        getList: getList,
        delete: deleteList,
        create: createList,
        update: updateList,
        addTodo: addTodo
    };
});

