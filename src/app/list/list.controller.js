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
            

        self.deleteList = function(id){
            listService.delete(id);
            // update LS
        };

        self.rewriteList = function(id) {

        };

        
    });