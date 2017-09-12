import listModule from './list.module';
import listService from './list.service';

export default listModule

    .controller('listController', function listController(listService,  modalService,  routeService){ 
   
        let self = this;
        self.lists = listService.get();
        self.newListTitle = '';

        // ////////////////////////////////////
        // service to open modal and getting routeParams
        self.modal = modalService;
        self.routeData = routeService.get();
        
        
        self.newList = function(title) {
            listService.create(title);
            console.log(self.lists.length);
        };

        self.handleEdit = function(list) {
            console.log('handle list');
            console.log(list);
            self.onEdit({item: list});         
        };

        self.$onInit = function() { 
            self.onEdit = self.onEdit; 
          };


          
    });