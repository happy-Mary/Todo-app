import todoModule from './todo.module';
import ToDo from './todo.constructor';

export default todoModule
.service('todoService', function($filter){
    let data = [];
    let itemItem;
    
    function get(){
        return data;
    }

    function getTodo(id) {
        // to filter data on route ???
        // itemItem = $filter("filter")(data, {id:id});
        data.forEach(function(item){
            if(item.id == id){
               itemItem = item;
            }
        });
    }

    function updateTodo(title){
        itemItem.title = title;
        return data;
    }

    function setTodo(obj) {
        data = obj;
    }

    function deleteTodo(id) {
        let index = data.findIndex(x => x.id==id);
        data.splice(index, 1);
        return data;
    }

    function createTodo(title, listId){
        let todo = new ToDo(title, listId);
        data.push(todo);
        return todo;
        // call constructor, save to data, return data
    }

    return {
        set: setTodo,
        get: get,
        getTodo: getTodo,
        delete: deleteTodo,
        create: createTodo,
        update: updateTodo
    };

});

