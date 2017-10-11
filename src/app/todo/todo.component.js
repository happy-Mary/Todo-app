import todoModule from './todo.module';
import todoTemplate from './todo.templ.html';

export default todoModule
    .component('todoComp', {
        bindings: {
            filterSearch: '='
        },
        template: todoTemplate,
        controller: 'todoController'
    });