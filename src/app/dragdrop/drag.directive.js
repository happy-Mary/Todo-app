import dragDropModule from './dragdrop.module';

export default dragDropModule.directive('dragDir', function dragDir() {
    return {
        restrict: 'A',
        scope: {
            verifyDragAllowed: '&',
            dragObj: '='
        },
        link: (scope, elem) => {
            scope.letDrag = scope.verifyDragAllowed({obj: scope.dragObj});

            function handleDragStart(ev) {
                ev.dataTransfer.setData('dragData', angular.toJson(scope.dragObj));
            }

            function handleDragEnd() {
                let element = angular.element(document.querySelectorAll('.dragover'));
                // console.log(element);
                // delete class .dragover through find();
            }

            if (scope.letDrag) {
                elem.on('dragstart', handleDragStart);
                elem.on('dragend', handleDragEnd);
            }
        }
    };
});