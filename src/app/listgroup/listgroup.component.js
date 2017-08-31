import listGroupModule from './listgroup.module';

export default listGroupModule
    .component('listGroupComponent',{
        bindings: {
            groupTitle: '@'
        },
        template: require('./listgroup.templ.html'),
        controller: 'listGroupController'
    });