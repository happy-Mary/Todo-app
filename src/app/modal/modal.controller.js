import modalModule from './modal.module';
import modalService from './modal.service';

export default modalModule
    .controller('modalController', function modalController(modalService) {
        var self = this;

        self.modalOptions = {
            open: false,
            id: 0
        };

        modalService.set(self.modalOptions);
        


        // self.closeModal = function(){
        // 	self.open = false;
        // 	console.log('sss');
        // };
        // self.openModal = function(){
        // 	self.open = true;
        // };

    });