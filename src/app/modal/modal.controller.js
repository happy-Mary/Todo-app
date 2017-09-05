import modalModule from './modal.module';

export default modalModule
    .controller('modalController', function modalController() {
        var self = this;

        self.open = true;
        self.closeModal = function(){
        	self.open = false;
        	console.log('sss')
        }
        self.openModal = function(){
        	self.open = true;
        }

    });