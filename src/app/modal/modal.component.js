import mainModule from '../module';

export default mainModule
    .component('modal',{
        bindings: {
            title: '@'
        },
        template: require('./modal.templ.html'),
        controller: 'modalController'
    });