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

    function closeModal(){
        for(var i = 0; i < controllers.length; i++){
            controllers[i].open = false;
        }
    }

    return {
        set: setOptions,
        open: openModal,
        close: closeModal
    };
 });