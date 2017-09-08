import listModule from './list.module';
import List from './list.constructor';

export default listModule
.factory('listService', function(){
    let self  = this;
    self.data = [4, 6, 7];
    // let itemItem;
    function getLists(){
        return self.data;
    }

    function setLists(obj) {
        self.data = obj;
        console.log('lists was setted in SERVICE');
        console.log(self.data);
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
        // console.log(`new list TITLE: ${title}`);
        // console.log(self.data.length);
        // console.log(self.data);
        let list = new List(title, id);
        self.data.push(list);
        // console.log(self.data.length);
        // console.log(self.data);
       
        // return self.data;
    }

    function updateList(id, title){
        let itemItem = getLists(id)
        itemItem.title = title;
        return self.data;
    }

    function deleteList(id) {
        let index = self.data.findIndex(x => x.id==id);
        self.data.splice(index, 1);
        return self.data;
    }

    
    function addTodo(id, todoId){
        var list =  getList(id);
        if(list){
            list.todoLists.push(todoId);
        }            
    }

    return {
        // listsServ: self.data,
        set: setLists,
        get: getLists,
        getList: getList,
        delete: deleteList,
        create: createList,
        update: updateList,
        addTodo: addTodo
    };
});

