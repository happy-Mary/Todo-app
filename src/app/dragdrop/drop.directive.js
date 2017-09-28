import dragDropModule from './dragdrop.module';

export default dragDropModule.directive('dropDir', function dropDir() {
    return {
        restrict: 'A',
        scope: {

        },
        link: (scope, elem) => {

        }
    };
});