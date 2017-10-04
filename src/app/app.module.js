require('@uirouter/angularjs');
require('angular-spinner');
require('./listgroup/listgroup.controller');
require('./listgroup/listgroup.service');
require('./listgroup/listgroup.component');
require('./list/list.controller');
require('./list/list.service');
require('./list/list.component');
require('./todo/todo.controller');
require('./todo/todo.service');
require('./todo/todo.component');
require('./modal/modal.controller');
require('./modal/modal.component');
require('./dragdrop/dragdrop.directive');

export default angular.module('mainModule', [
    'ui.router',
    'angularSpinner',
    'listGroupModule',
    'listModule',
    'todoModule',
    'modalModule',
    'dragDropModule'
]);
