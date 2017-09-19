import todoModule from './todo.module';

export default todoModule
    .component('todoComp', {
        bindings: {
            filterSearch: '=',
        },
        template: require('./todo.templ.html'),
        controller: 'todoController'
    });