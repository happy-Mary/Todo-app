import modalModule from './modal.module';

export default modalModule
.service('modalService', function(){
    let self = this;
    self.controllers = {};


    function registerModal(id, modalCtrl){
        self.controllers[id] = modalCtrl;
    }

    function openModal(id){
       let modalIds = Object.keys(self.controllers);
       for(let i = 0; i<modalIds.length; i++){
         let key = modalIds[i];
        //  send obj to controller
        (modalIds[i] == id) ? self.controllers[key].show() : self.controllers[key].hide();
       }
    }

    function closeModal(){
        for(let key in self.controllers){
          self.controllers[key].hide();
        }
    }

    return {
        register: registerModal,
        open: openModal,
        close: closeModal
        // set: setOptions,   
    };
 });