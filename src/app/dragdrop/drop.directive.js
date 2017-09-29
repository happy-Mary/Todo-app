import dragDropModule from './dragdrop.module';

export default dragDropModule.directive('dropDir', function dropDir() {
    return {
        restrict: 'A',
        scope: {
            verifyDropAllowed: '&',
            dropObj: '=',
            executeDrop: '&'
        },
        link: (scope, elem) => {
            let dragData = null;
            
            // scope.letDrop = scope.verifyDropAllowed({dragObj: dragData, dropObj: scope.dropObj});
            // console.log(scope.letDrop);

            function handleDragOver(ev) {
                ev.preventDefault();
                // dragData = ev.dataTransfer.getData('dragData');
                // console.log(angular.fromJson(dragObj));
                // console.log('dragData');
                // console.log(elem);
                elem.addClass('dragover');
            }

            function handleDrop(ev) {
                ev.preventDefault();
                // change id of dragobj from obj
                dragData = angular.fromJson(ev.dataTransfer.getData('dragData'));
                scope.letDrop = scope.verifyDropAllowed({dragObj: dragData, dropObj: scope.dropObj});
                if (scope.letDrop) {
                    scope.executeDrop({dragObj: dragData, dropObj: scope.dropObj});
                }
            }

            function handleDragLeave(ev) {
                ev.preventDefault();
                elem.removeClass('dragover');
            }

            elem.on('dragover', handleDragOver);

            // if (scope.letDrop) {
                elem.on('dragover', handleDragOver);
                elem.on('drop', handleDrop);  
                elem.on('dragleave', handleDragLeave);
            // }

        }
    };
});