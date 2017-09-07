import modalModule from './modal.module';

export default modalModule
.service('modalService', function(){
    let controllers = [];

    function setOptions(obj){
        controllers.push(obj);
    }

    function openModal(currId){
        for(var i = 0; i < controllers.length; i++){
            controllers[i].id  = currId;
            controllers[i].open = true;
        }
    }

    return {
        set: setOptions,
        open: openModal
    };
 });