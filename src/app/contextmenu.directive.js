import mainModule from './app.module';

export default mainModule
   .directive('ngContextMenu', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngContextMenu);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
	});