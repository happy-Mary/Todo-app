import contextMenuModule from './context.menu.module';
import '../../sass/contextMenu.scss';

export default contextMenuModule
    .controller('contextMenuController', function contextMenuController(contextMenuService) {
        const self = this;
        // let topCoordinate;
        // let leftCoordinate;
        self.topCoordinate = 200;
        const contextMenu = angular.element(document.querySelector('context'));

        document.body.addEventListener('click', () => {
            contextMenu.removeClass('active');
        }, true);
        contextMenu.on('click', (event) => {
            event.stopPropagation();
        });
        self.open = () => {
            
        };
        self.$onInit = () => {
            self.menuId = self.menuId;
            console.log(self.menuId);
            self.coordinate = contextMenuService.getCoordinate();
            
        };
    });
    