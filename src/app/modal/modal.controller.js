import modalModule from './modal.module';

export default modalModule
    .controller('modalController', function modalController(modalService) {
        const self = this;
        self.open = false;
        self.id = undefined;

        self.$onInit = function() {
            self.id = self.modalId;
            modalService.register(self.id, self);
        };

        self.show = function() {
            self.open = true;
        };

        self.hide = function() {
            self.open = false;
        };
    });