import contextMenuModule from './context.menu.module';

export default contextMenuModule
    .service('contextMenuService', function contextMenuService() {
        const self = this;
        self.selectedItem;
        self.coordinate = {};

        self.setItem = function(event, item){
            self.selectedItem = item;
            self.coordinate.x = event.pageX;
            self.coordinate.y = event.pageY;
        }
        self.getItem = function(){
            return self.selectedItem;
        }
        self.getCoordinate = () => {
           return self.coordinate;
        }

        return {
            getItem: self.getItem,
            set: self.setItem,
            getCoordinate: self.getCoordinate
        }
    });
        
