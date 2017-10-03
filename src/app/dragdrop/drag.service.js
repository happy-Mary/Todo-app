import dragDropModule from './dragdrop.module';

dragDropModule.service('dragService', [function dragService() {
    let dragData;

    function setDragData(data) {
        dragData = data;
    }

    function getDragData() {
        return dragData;
    }

    return {
        set: setDragData,
        get: getDragData
    }
}]);