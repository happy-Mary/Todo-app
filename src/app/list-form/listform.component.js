import listFormModule from './listform.module';
import listFormTemplate from './listform.templ.html';

export default listFormModule
    .component('listForm', {
        bindings: {
            state: '@',
            editData: '<'
        },
        template: listFormTemplate,
        controller: 'listFormController'
    });