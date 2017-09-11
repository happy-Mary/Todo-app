import modalModule from './modal.module';

export default modalModule
    .component('modal',{
        transclude: true,
        bindings: {
            title: '@',
            modalId: '@' 
        },
        template: require('./modal.templ.html'),
        controller: 'modalController',
    });