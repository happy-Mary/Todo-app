import listFormModule from './listform.module';

export default listFormModule
    .component('listForm', {
        bindings: {
            state: '@',
            editData: '<'
        },
        template: require('./listform.templ.html'),
        controller: 'listFormController'
    });