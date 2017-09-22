import folderFormModule from './folderform.module';
import folderformTemplate from './folderform.templ.html';

export default folderFormModule
    .component('folderForm', {
        bindings: {
            state: '@',
            editData: '<'
        },
        template: folderformTemplate,
        controller: 'folderFormController'
    });