import mainModule from './app.module';

export default mainModule	
	.controller('mainController', function($transitions, $state, usSpinnerService) {
		let self = this;
		 self.hideSpinner = function() {
            usSpinnerService.stop();
        };
        self.showSpinner = function() {
            usSpinnerService.spin();
        };
          $transitions.onSuccess({}, () => {
         	self.hideSpinner();
        });
        $transitions.onStart({}, () => {
            self.showSpinner();         
        });
        $transitions.onError({}, () => {
            console.error('transition has been rejected');
        });

	})