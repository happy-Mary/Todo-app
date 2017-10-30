import mainModule from '../app.module';

export default mainModule
.directive('autoheight', ($timeout) => {
	return {
	 	// function(scope, element, attrs) {
	 	restrict: 'A',
		link: function(scope, element, attrs) {	
			element.ready(function() {
		    	element.css('height', `${element[0].scrollHeight}px`);
		    });
		    
		    element.on('keydown', (event) => {
	        	let target = event.target;		        
		        $timeout(() => {
		         	element.css('height', 'auto');
					element.css('height', `${target.scrollHeight}px`);
				}, 0);
	        });	
		} 	
	};
});
