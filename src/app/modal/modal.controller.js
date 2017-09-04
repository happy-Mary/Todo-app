import modalModule from './modal.module';

export default modalModule
    .controller('modalController', function modalController($http, localStorageService, listGroupService) {
        var self = this;
        self.open =  false;
        self.closeModal{
        	self.open = false;
        }
        self.openModal{
        	self.open = true;
        }

    });