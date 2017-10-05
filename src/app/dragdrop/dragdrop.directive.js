import dragDropModule from './dragdrop.module';

require('./drag.service');

export default dragDropModule.directive('dragdropDir', ['dragService', function dragDir(dragService) {
    return {
        restrict: 'A',
        scope: {
            verifyDragAllowed: '&',
            dragObj: '=',
            verifyDrop: '&',
            dropObj: '=',
            executeDrop: '&'
        },
        link: (scope, elem) => {
            // DRAGGING
            let letDrag;

            function setDraggableAttributes() {
                if (scope.verifyDragAllowed && scope.dragObj) {
                    elem.attr('draggable', 'true');
                    elem.children().attr('draggable', 'false');
                    letDrag = scope.verifyDragAllowed({ obj: scope.dragObj });
                } else {
                    elem.attr('draggable', 'false');
                    elem.children().attr('draggable', 'false');
                }
            }

            function handleDragStart() {
                dragService.set(scope.dragObj);
                return false;
            }

            function handleDragEnd(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                const dropElement = angular.element(document.querySelectorAll('.drag-over'));
                dropElement.removeClass('drag-over');
            }

            // DROPPING
            let dragData;

            function handleDragOver(ev) {
                ev.preventDefault();
                dragData = dragService.get();
                if (dragData) {
                    const letDrop = scope.verifyDrop({
                        dragObj: dragData,
                        dropObj: scope.dropObj
                    });
                    if (letDrop) {
                        elem.addClass('drag-over');
                    }
                }
            }

            function handleDrop(ev) {
                ev.preventDefault();
                elem.removeClass('drag-over');
                const letDrop = scope.verifyDrop({ dragObj: dragData, dropObj: scope.dropObj });
                if (dragData && letDrop) {
                    scope.executeDrop({ dragObj: dragData, dropObj: scope.dropObj });
                }
            }

            function handleDragLeave(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                const dropElement = angular.element(document.querySelectorAll('.drag-over'));
                dropElement.removeClass('drag-over');
            }

            setDraggableAttributes();

            if (letDrag) {
                elem.on('dragstart', handleDragStart);
                elem.on('dragend', handleDragEnd);
            }
            elem.on('dragover', handleDragOver);
            elem.on('drop', handleDrop);
            elem.on('dragleave', handleDragLeave);
        }
    };
}]);