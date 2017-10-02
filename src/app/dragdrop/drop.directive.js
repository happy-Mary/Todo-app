import dragDropModule from './dragdrop.module';
// import dragService from './drag.service';
// import dragDir from './drag.directive';

export default dragDropModule.directive('dropDir', ['dragService', function dropDir(dragService) {
    return {
        restrict: 'A',
        scope: {
            verifyDrop: '&',
            dropObj: '=',
            executeDrop: '&'
        },
        link: (scope, elem) => {
            let dragData;
            let letDrop = false;

            function handleDragOver(ev) {
                ev.preventDefault();
                dragData = dragService.get();
                if (dragData) {
                    letDrop = scope.verifyDrop({ dragObj: dragData, dropObj: scope.dropObj });
                    if (letDrop) elem.addClass('drag-over');
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
            elem.on('drop', handleDrop);
            elem.on('dragleave', handleDragLeave);
        }
    };
}]);