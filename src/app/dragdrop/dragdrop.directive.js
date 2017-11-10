import dragDropModule from './dragdrop.module';

require('./drag.service');

export default dragDropModule.directive('dragdropDir', ['dragService', function dragDir(dragService) {
    return {
        restrict: 'A',
        scope: {
            verifyDragAllowed: '&',
            dragObj: '=',
            verifyDropAllowed: '&',
            dropObj: '=',
            executeDrop: '&'
        },
        link: (scope, elem) => {
            // DRAGGING
            let letDrag;
            let dragData;

            function setDraggableAttributes() {
                if (scope.verifyDragAllowed && scope.dragObj) {
                    elem.attr('draggable', 'true');
                    elem.children().attr('draggable', 'false');
                } else {
                    elem.attr('draggable', 'false');
                    elem.children().attr('draggable', 'false');
                }
            }

            function handleDragStart() {
                letDrag = scope.verifyDragAllowed({ obj: scope.dragObj });
                if (letDrag) {
                    dragService.set(scope.dragObj);
                }
                return false;
            }

            function handleDragEnd(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                const dropElement = angular.element(document.querySelectorAll('.drag-over'));
                dropElement.removeClass('drag-over');
            }

            // DROPPING
            function handleDragOver(ev) {
                ev.preventDefault();
                dragData = dragService.get();
                if (dragData) {
                    const letDrop = scope.verifyDropAllowed({
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
                const letDrop = scope.verifyDropAllowed({
                    dragObj: dragData,
                    dropObj: scope.dropObj
                });
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

            elem.on('dragstart', handleDragStart);
            if (letDrag) {
                elem.on('dragend', handleDragEnd);
            }
            elem.on('dragover', handleDragOver);
            elem.on('drop', handleDrop);
            elem.on('dragleave', handleDragLeave);
        }
    };
}]);