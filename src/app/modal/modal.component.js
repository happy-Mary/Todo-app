import modalModule from './modal.module';
import modalTemplate from './modal.templ.html';

export default modalModule
    .component('modal', {
        transclude: true,
        bindings: {
            title: '@',
            modalId: '@'
        },
        template: modalTemplate,
        controller: 'modalController',
    });