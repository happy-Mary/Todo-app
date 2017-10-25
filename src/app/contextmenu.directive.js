import mainModule from './app.module';

export default mainModule
.directive('ngRightClick', function($parse) {
 return function(scope, element, attrs) {
     const fn = $parse(attrs.ngRightClick);
     element.bind('contextmenu', function(event) {
         scope.$apply(function() {
             event.preventDefault();
             fn(scope, { $event: event });
         });
     });
 };
 });
