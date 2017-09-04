import modalModule from './modal.module';

export default modalModule
    .controller('modalController', function modalController() {
        var self = this;

        self.open =  false;
        self.closeModal = function(){
        	self.open = false;
        }
        self.openModal = function(){
        	self.open = true;
        }

    });