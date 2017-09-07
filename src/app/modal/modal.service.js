import modalModule from './modal.module';

export default modalModule
.service('modalService', function(){
    let controllers = [];

    function setOptions(obj){
        controllers.push(obj);
        console.log(controllers);
    }

    function openModal(currId){
        console.log('opening modal');
        for(var i = 0; i < controllers.length; i++){
            controllers[i].id  = currId;
            controllers[i].open = true;
        }
        console.log(controllers);
    }

    return {
        set: setOptions,
        open: openModal
    };
 });