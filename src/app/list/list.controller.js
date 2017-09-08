import listModule from './list.module';
import listService from './list.service';

export default listModule
    .controller('listController', function listController(listService) {
        let self = this;
        self.lists = listService.get();
        self.addActive = false;
        self.newListTitle = '';

         // take id through $routeProvider
        let filterById = 0;
        self.filterData = function(item) {
            if(item.listGroupId === filterById){
                return item;
            }
        };

        self.addList = function() {
            self.addActive = true;
        };

        self.saveList = function() {
            console.log(self.newListTitle);
            listService.create(self.newListTitle);
            // save to LS
            self.addActive = false;
            self.newListTitle = '';
        };

        self.deleteList = function(id){
            listService.delete(id);
            // update LS
        };

        self.rewriteList = function(id) {

        };
    });