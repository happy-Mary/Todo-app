import modalModule from './modal.module';
import modalService from './modal.service';

export default modalModule
    .controller('modalController', function modalController(modalService) {
        var self = this;
        self.open = false;
        self.id = undefined;
     
        self.test = 'just string';

        self.$onInit = function () { 
            self.id = self.modalId;
            modalService.register(self.id, self);
        };

        self.show = function() {
            self.open = true;
        };

        self.hide = function() {
            self.open = false;
        }


        // modalService.set(self.modalOptions);
        
    });