import dragDropModule from './dragdrop.module';

export default dragDropModule.directive('dragDir', [function dragDir() {
    return {
        restrict: 'A',
        scope: {
            verifyDragAllowed: '&',
            dragObj: '='
        },
        link: (scope, elem) => {
            const letDrag = scope.verifyDragAllowed({ obj: scope.dragObj });

            function handleDragStart(ev) {
                ev.dataTransfer.setData('dragData', angular.toJson(scope.dragObj));
            }

            function handleDragEnd(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                const dropElement = angular.element(document.querySelectorAll('.drag-over'));
                dropElement.removeClass('drag-over');
            }

            if (letDrag) {
                elem.on('dragstart', handleDragStart);
                elem.on('dragend', handleDragEnd);
            }
        }
    };
}]);