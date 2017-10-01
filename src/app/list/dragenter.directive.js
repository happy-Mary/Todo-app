import listModule from './list.module';

listModule.directive('dragenterDir', [function dragEnt() {
    return {
        restrict: 'A',
        scope: false,
        link: (scope, elem) => {
            elem.on('dragenter', function() {
                // IT DOESN'T WORK
                // console.log('DRAGGED ENTER');
                // elem.attr('drop-dir', "");
                // elem.removeAttr('drag-dir', "");
            })
        }
    }
}]);