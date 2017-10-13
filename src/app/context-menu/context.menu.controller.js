import contextMenuModule from './context.menu.module';
import '../../sass/contextMenu.scss';

export default contextMenuModule
    .controller('contextMenuController', function contextMenuController() {
        const self = this;
        const contextMenu = angular.element(document.querySelector('context'));

        document.body.addEventListener('click', () => {
            contextMenu.removeClass('active');
        });
        contextMenu.on('click', (event) => {
            event.stopPropagation();
        });
    });
    