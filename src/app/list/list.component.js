import listModule from './list.module';

export default listModule
    .component('listComp', {
        bindings: {
            filterId: '<',
            onEdit: '&',
            onDelete: '&'
        },
        controller: 'listController',
        template: require('./list.templ.html')
    });