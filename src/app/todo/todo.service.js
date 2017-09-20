import todoModule from './todo.module';
import ToDo from './todo.constructor';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default todoModule
.service('todoService', function($filter, $http, localStorageService){
    let data = [];
    let itemItem;
    
    function register() {
        if(localStorageService.get('todo')){
                data = localStorageService.get('todo');
        }
        else {
            $http({ method: 'GET', url: URLS.todoURL })
                .then(function successCallback(response) {
                    data = response.data;
                    save();
                })
                .catch(function errorCallback() {
                    data = [];
                    save();
                });
        }    
        return data;
    }

    function get() {
        return data;
    }

    function save() {
        localStorageService.set('todo', data);
    }

    function getTodo(id) {
        data.forEach(function(item){
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
        data = obj;
    }

    function deleteTodo(id) {
        let index = data.findIndex(x => x.id==id);
        data.splice(index, 1);
        return data;
    }

    function createTodo(title, listId, marked){
        let todo = new ToDo(title, listId, marked);
        data.push(todo);
        save();
    }

    function getCountTodoInList(listId){
        var todo = data.filter(function(todo){
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

