import mainModule from '../app.module';

export default mainModule
.directive('autoheight', ['$timeout', function autoheightDirective($timeout) {
	return {
		restrict: 'A',
		link: function postLink(scope, element) {
			element.ready(() => {
				element.css('height', `${element[0].scrollHeight}px`);
			});
			element.on('keydown', (event) => {
				const target = event.target;
				$timeout(() => {
				element.css('height', 'auto');
					element.css('height', `${target.scrollHeight}px`);
				}, 0);
			});
		}
	};
}]);
