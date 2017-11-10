import mainModule from '../app.module';

export default mainModule.directive('fileInput', [function fileDir() {
    return {
        scope: {
            handleFile: '&'
        },
        restrict: 'A',
        link: function postLink(scope, elem) {
            elem.on("change", () => {
                const files = elem[0].files;
                scope.handleFile({ data: files });
                elem.val(null);
            })
        }
    }
}]);