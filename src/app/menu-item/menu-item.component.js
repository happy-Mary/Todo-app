import menuItemModule from './menu-item.module';
import menuItemTemplate from './menu-item.templ.html';

export default menuItemModule
    .component('menuItem', {
        transclude: true,
        bindings: {
            text: '@'
        },
        template: menuItemTemplate
    });