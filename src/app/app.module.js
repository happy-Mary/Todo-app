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
require('./context-menu/context.menu.component');
require('./context-menu/context.menu.controller');
require('./context-menu/context.menu.service');
require('./menu-item/menu-item.component');
require('./todoside/todoside.controller');
require('./todoside/todoside.component');
require('./todoside/subtask.service');

export default angular.module('mainModule', [
	'menuItemModule',
    'ui.router',
    'angularSpinner',
    'listGroupModule',
    'listModule',
    'todoModule',
    'modalModule',
    'dragDropModule',
    'menuItemModule',
    'contextMenuModule',
    'todosideModule'
    
]);
