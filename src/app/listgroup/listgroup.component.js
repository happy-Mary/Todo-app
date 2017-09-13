import listGroupModule from './listgroup.module';

export default listGroupModule
    .component('listGroupComponent',{
        bindings: {
            // state: '@'
            onEdit: '&',
            onDelete: '&'
        },
        template: require('./listgroup.templ.html'),
        controller: 'listGroupController'
    });