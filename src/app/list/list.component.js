import listModule from './list.module';

export default listModule
    .component('listComp', {
        bindings: {
            filterId: '<',
            // remove to TODO-search router
            filterSearch: '<',
        },
        controller: 'listController',
        template: require('./list.templ.html')
    });