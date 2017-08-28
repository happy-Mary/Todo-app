import appModule from './app.module';

export default appModule
    .controller('AppController', function AppController() {
        let self = this;
        self.hello = "HELLO We are here";
    });