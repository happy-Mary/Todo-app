import listFormModule from './listform.module';

export default listFormModule
    .component('listForm', {
        bindings: {
            state: '@'
        },
        template: require('./listform.templ.html'),
        controller: 'listFormController'
    });