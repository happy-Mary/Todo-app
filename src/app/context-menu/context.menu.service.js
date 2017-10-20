import contextMenuModule from './context.menu.module';

export default contextMenuModule
    .service('contextMenuService', function contextMenuService() {
        const self = this;
        self.selectedItem;
        self.coordinate = {};
        self.states = [];

        self.setItem = function(event, item){
            self.selectedItem = item;
            self.coordinate.x = event.pageX;
            self.coordinate.y = event.pageY;
        };
       
        self.getItem = function(){
            return self.selectedItem;
        };

        self.getCoordinate = () => {
           return self.coordinate;
        };

        self.setMenu = (id) => {
            self.states.push({
                id: id,
                state: false
            })
        };

        self.getState = (id) => {
            let state = null;
            self.states.forEach( (item) => {
                if(item.id == id){
                   state = item;
                   return 
                }
            })
        return state;
        };

        self.setState = (id, state) => {
            self.states.forEach( (item) => {
                if(item.id == id){
                    item.state = state;
                }
                else{
                    item.state = false;
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
    });
        
