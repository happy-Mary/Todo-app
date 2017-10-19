import todosideModule from './todoside.module';
import todosideTemplate from './todoside.templ.html';

export default todosideModule.component('todosideComp', {
    bindings: {},
    template: todosideTemplate,
    controller: 'todosideController'
});