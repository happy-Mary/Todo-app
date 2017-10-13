import mainModule from './app.module';

export default mainModule
    .controller('mainController', function mainController($transitions, $state, usSpinnerService, contextMenuService) {
        const self = this;
        self.hideSpinner = function hideSpinner() {
            usSpinnerService.stop();
        };
        self.showSpinner = function showSpinner() {
            usSpinnerService.spin();
        };
        $transitions.onSuccess({}, () => {
            self.hideSpinner();
        });
        $transitions.onStart({}, () => {
            self.showSpinner();
        });
        $transitions.onError({}, () => {
            usSpinnerService.stop();
            // show user error message, remove console message
            console.error('transition has been rejected');
        });

        //TABS delete
        self.handle = function(){
            console.log('sasasasa');
            // var a = contextMenuService.get();
            // console.log(a);
        };
        self.handle2 = function(event){
            console.log(event);
        }

    });