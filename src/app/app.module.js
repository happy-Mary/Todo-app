require('@uirouter/angularjs');
require('angular-spinner');
require('./listgroup/listgroup.controller');
require('./listgroup/listgroup.service');
require('./listgroup/listgroup.component');
require('./list/list.controller');
require('./list/list.service');
require('./list/list.component');
require('./todo/todo.controller');
require('./todo/todo.component');
require('./todo/todo.service');
require('./modal/modal.controller');
require('./modal/modal.component');
require('./dragdrop/dragdrop.directive');
require('./todoside/todoside.controller');
require('./todoside/todoside.component');
require('./todoside/subtask.service');

export default angular.module('mainModule', [
    'ui.router',
    'angularSpinner',
    'listGroupModule',
    'listModule',
    'todoModule',
    'modalModule',
    'dragDropModule',
    'todosideModule'
]);