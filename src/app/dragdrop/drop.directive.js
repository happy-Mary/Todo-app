import dragDropModule from './dragdrop.module';

export default dragDropModule.directive('dropDir', [function dropDir() {
    return {
        restrict: 'A',
        scope: {
            verifyDrop: '&',
            dropObj: '=',
            executeDrop: '&'
        },
        link: (scope, elem) => {
            let dragData = null;
            // scope.letDrop = scope.verifyDropAllowed({dragObj: dragData, dropObj: scope.dropObj});
            // console.log(scope.letDrop);
            function handleDragOver(ev) {
                ev.preventDefault();
                elem.addClass('drag-over');
            }

            function handleDrop(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                dragData = ev.dataTransfer.getData('dragData');
                if (dragData) {
                    dragData = angular.fromJson(dragData);
                    const letDrop = scope.verifyDrop({ dragObj: dragData, dropObj: scope.dropObj });
                    if (letDrop) {
                        scope.executeDrop({ dragObj: dragData, dropObj: scope.dropObj });
                    }
                }
            }

            function handleDragLeave(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                elem.removeClass('drag-over');
            }

            elem.on('dragover', handleDragOver);
            elem.on('drop', handleDrop);
            elem.on('dragleave', handleDragLeave);
        }
    };
}]);