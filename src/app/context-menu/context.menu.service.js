import contextMenuModule from './context.menu.module';

export default contextMenuModule
    .service('contextMenuService', [function contextMenuService() {
        const self = this;
        self.selectedItem = null;
        self.coordinate = {};
        self.states = [];

        self.setItem = (event, item) => {
            self.selectedItem = item;
            self.coordinate.x = event.pageX;
            self.coordinate.y = event.pageY;
        };

        self.getItem = () => self.selectedItem;

        self.getCoordinate = () => self.coordinate;

        self.setMenu = (curId) => {
            self.states.push({
                id: curId,
                state: false
            });
        };

        self.getState = (id) => {
            let state = null;
            self.states.forEach((item) => {
                if (item.id == id) {
                   state = item;
                }
            })
        return state;
        };

        self.setState = (id, state) => {
            self.states.forEach((item) => {
                const menu = item;
                if (menu.id == id) {
                    menu.state = state;
                } else {
                    menu.state = false;
                }
            })
        };

        return {
            getItem: self.getItem,
            set: self.setItem,
            getCoordinate: self.getCoordinate,
            setMenu: self.setMenu,
            setState: self.setState,
            getState: self.getState
        }
    }]);
