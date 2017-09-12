import listModule from './list.module';

export default listModule
    .component('listComp', {
        bindings: {
            filterId: '<',
            // remove to TODO-search router
            filterSearch: '<',
            onEdit: '&'
        },
        controller: 'listController',
        template: require('./list.templ.html')
    });