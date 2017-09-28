import dragDropModule from './dragdrop.module';

export default dragDropModule.directive('dragDir', function dragDir() {
    return {
        restrict: 'A',
        scope: {
            'verifyDragAllowed': '&verifyDrag'
        },
        link: (scope, elem) => {
            scope.letDrag = verifyDragAllowed();
            if (scope.letDrag) {
                elem.addEventListener();
            }
        }
    };
});