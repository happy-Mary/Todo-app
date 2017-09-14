import listModule from './list.module';
import listService from './list.service';

export default listModule

    .controller('listController', function listController(listService,  modalService, routeService){ 
   
        let self = this;
        self.lists = listService.get();
        self.newListTitle = '';

        // ////////////////////////////////////
        // service to open modal and getting routeParams
        self.modal = modalService;
        // delete after UI-ROUTER
        self.routeData = routeService.get();
        
        self.newList = function(title) {
            listService.create(title);
        };

        self.handleEdit = function(list) {
            self.onEdit({item: list});         
        };

        self.handleDelete = function(list) {
            self.onDelete({item: list});         
        };

        self.$onInit = function() { 
            self.onEdit = self.onEdit; 
            self.onDelete = self.onDelete;
        };

        self.$onChanges = function(changesObj) { 
            console.log(changesObj);
            
        };

        


          
    });