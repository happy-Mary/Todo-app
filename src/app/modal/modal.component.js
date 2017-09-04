import modalModule from './modal.module';

export default modalModule
    .component('modal',{
        bindings: {
            title: '@',
            close: '&onClose'
        },
        template: require('./modal.templ.html'),
        controller: 'modalController'
    });