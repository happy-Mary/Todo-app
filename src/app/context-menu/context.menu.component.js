import contextMenuModule from './context.menu.module';
import contextMenuTemplate from './context.menu.templ.html';

export default contextMenuModule
    .component('context', {
    	transclude: true,
        bindings: {
            data: '=',
        },
        template: contextMenuTemplate,
        controller: 'contextMenuController'
    });