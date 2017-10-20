import modalModule from './modal.module';
import '../../sass/modal.scss';

export default modalModule
    .controller('modalController', function modalController(modalService) {
        const self = this;
        self.open = false;
        self.id = undefined;

        self.$onInit = () => {
            self.id = self.modalId;
            modalService.register(self.id, self);
        };

        self.show = () => {
            self.open = true;
        };

        self.hide = () => {
            self.open = false;
        };

    });