import listModule from './list.module';

export default listModule
    .component('listComp',{
        bindings: {
            listsTitle: '@'
        },
        template: require('./list.templ.html'),
        controller: 'listController'
    });