import todoModule from './todo.module';
import ToDo from './todo.constructor';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default todoModule
.service('todoService', function($filter, $http, localStorageService){
    let itemItem;
    let self = this;
    self.data = [];

    function get(){
        return self.data;
    };

    function save() {
        localStorageService.set('todo', self.data);
    }
 
    function getTodo(id) {
        self.data.forEach(function(item){
            if(item.id == id){
               itemItem = item;
            }
        });
    }

    function updateTodo(){
        // itemItem.title = title;
        // return data;
        save();
    }

    function setTodo(obj) {
        self.data = obj;
    }

    function deleteTodo(id) {
        let index = data.findIndex(x => x.id==id);
        self.data.splice(index, 1);
        return self.data;
    }

    function createTodo(title, listId, marked){
        let todo = new ToDo(title, listId, marked);
        self.data.push(todo);
        // return todo;
        console.log(todo);
        save();
    }

    function getCountTodoInList(listId){
        var todo = self.data.filter(function(todo){
            if(todo.listId == listId){
                return true;
            }
            else{
                return false;
            }
        });
        return todo.length;
    }

    register();

    return {
        register: registerTodo,
        set: setTodo,
        get: get,
        register: register,
        getTodo: getTodo,
        delete: deleteTodo,
        create: createTodo,
        update: updateTodo,
        save: save,
        getCountTodo: getCountTodoInList
    };

});

