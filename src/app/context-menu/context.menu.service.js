import contextMenuModule from './context.menu.module';

export default contextMenuModule
    .service('contextMenuService', function contextMenuService() {
        const self = this;
        self.selectedItem;

        self.setItem = function(item){
           self.selectedItem = item;
       }
        self.getItem = function(){
            return self.selectedItem;
        }
        return{
            get: self.getItem,
            set: self.setItem
        }
    });
        
