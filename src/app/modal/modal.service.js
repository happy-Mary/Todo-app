import modalModule from './modal.module';

export default modalModule
    .service('modalService', function modalService() {
        const self = this;
        self.controllers = {};

        function registerModal(id, modalCtrl) {
            self.controllers[id] = modalCtrl;
        }

        function openModal(id) {
            const modalIds = Object.keys(self.controllers);
            for (let i = 0; i < modalIds.length; i += 1) {
                const key = modalIds[i];
                //  send obj to controller
                if (modalIds[i] == id) self.controllers[key].show();
                else self.controllers[key].hide();
            }
        }

        function closeModal() {
            const keys = Object.keys(self.controllers);
            angular.forEach(keys, (key) => {
                self.controllers[key].hide();
            });
        }

        return {
            register: registerModal,
            open: openModal,
            close: closeModal
        };
    });