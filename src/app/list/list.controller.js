import listModule from './list.module';
import listService from './list.service';

export default listModule

    .controller('listController', function listController(listService,  modalService, $transitions){ 
   
        let self = this;
        self.lists = listService.get();
        
        self.newListTitle = '';
     
        self.modal = modalService;

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

        

    });