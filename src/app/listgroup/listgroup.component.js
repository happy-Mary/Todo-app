import listGroupModule from './listgroup.module';

export default listGroupModule
    .component('listGroupComponent',{
        bindings: {
            // state: '@'
        },
        template: require('./listgroup.templ.html'),
        controller: 'listGroupController'
    });