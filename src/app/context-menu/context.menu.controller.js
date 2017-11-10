import contextMenuModule from './context.menu.module';
import '../../sass/contextMenu.scss';

export default contextMenuModule
    .controller('contextMenuController', function contextMenuController($scope, contextMenuService) {
        const self = this;

        document.body.addEventListener('click', () => {
            $scope.$apply(() => {
                contextMenuService.setState(self.menuId, false);
            });
        }, false);

        self.$onInit = () => {
            self.menuId = self.menuId;
            contextMenuService.setMenu(self.menuId);
            self.coordinate = contextMenuService.getCoordinate();
            self.state = contextMenuService.getState(self.menuId);
        };
    });