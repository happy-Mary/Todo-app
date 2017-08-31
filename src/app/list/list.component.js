import listModule from './list.module';

export default listModule
    .component('listComp', {
        bindings: {
            listsTitle: '@'
        },
        controller: 'listController',
        template: require('./list.templ.html')
    });