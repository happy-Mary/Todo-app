import folderFormModule from './folderform.module';

export default folderFormModule
    .component('folderForm',{
        bindings: {
            state: '@',
            editData: '<'
        },
        template: require('./folderform.templ.html'),
        controller: 'folderFormController'
    });