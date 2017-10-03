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
        
            let letDrag;
            
            if (scope.verifyDragAllowed && scope.dragObj) {
                // elem.attr('draggable', 'true');
                // elem.children().attr('draggable', 'false');
                letDrag = scope.verifyDragAllowed({ obj: scope.dragObj });
                // console.log(elem.parent());
                // console.log(letDrag);
            } else {
                // elem.attr('draggable', 'false');
                // elem.children().attr('draggable', 'false');
                // console.log(elem.parent());
                // console.log("this obj can't be DRAGGABLE");
            }
            
            function handleDragStart(ev) {
                ev.dataTransfer.setData('dragData', angular.toJson(scope.dragObj));
                dragService.set(scope.dragObj);
                // console.log("Saving drag data: ");
                // console.log(scope.dragObj);
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

            // DROPPING
            let dragData;
            let letDrop = false;

            function handleDragOver(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                console.log(this);

                dragData = dragService.get();
                console.log('drag data');
                console.log(dragData.type);
                console.log('drop data');
                console.log(scope.dropObj);
                
                if (dragData && scope.verifyDrop) {
                    letDrop = scope.verifyDrop({ dragObj: dragData, dropObj: scope.dropObj });
                    // console.log(letDrop);
                    if (letDrop) elem.addClass('drag-over');
                } else {
                    console.log("this obj can't be DROPPABLE");
                }
            }

            function handleDrop(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                elem.removeClass('drag-over');
                if (dragData && letDrop) {
                    scope.executeDrop({ dragObj: dragData, dropObj: scope.dropObj });
                }
            }

            function handleDragLeave(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                elem.removeClass('drag-over');
            }

            elem.on('dragover', handleDragOver);
            // if (letDrop) {
                elem.on('drop', handleDrop);
                elem.on('dragleave', handleDragLeave);
            // }
            
        }
    };
}]);