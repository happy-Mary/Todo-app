import mainModule from './app.module';

export default mainModule
.service('routeService', function(){ 
    let data = {};

    function setRouteData(obj){
        data = obj;
    }

    function getRouteData(){
        return data;
    }

    function setListId(id){
        data.listid = id;
    }

    return {
        get: getRouteData,
        set: setRouteData,
        setlistid: setListId
    };
});