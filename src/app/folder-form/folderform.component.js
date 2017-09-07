import folderFormModule from './folderform.module';

export default folderFormModule
    .component('folderForm',{
        bindings: {

        },
        template: require('./folderform.templ.html'),
        controller: 'folderFormController'
    });