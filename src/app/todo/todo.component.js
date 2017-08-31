import todoModule from './todo.module';

export default todoModule
    .component('todoComp', {
        template: require('./todo.templ.html'),
        bindings: {todoTitle: '@'},
        controller: 'todoController'
    });