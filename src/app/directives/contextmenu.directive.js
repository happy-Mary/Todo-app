import mainModule from '../app.module';

export default mainModule
.directive('ngRightClick', ['$parse', function rightClickDirective($parse) {
 return function postLink(scope, element, attrs) {
     const fn = $parse(attrs.ngRightClick);
     element.bind('contextmenu', (event) => {
         scope.$apply(() => {
             event.preventDefault();
             fn(scope, { $event: event });
         });
     });
 };
 }]);
