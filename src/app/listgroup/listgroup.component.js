import listGroupModule from './listgroup.module';

export default listGroupModule
    .component('listGroupComponent',{
        template: require('./listgroup.templ.html'),
        controller: 'listGroupController'
    });