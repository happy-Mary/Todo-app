import mainModule from './app.module';

export default mainModule
    .controller('AppController', function AppController() {
        let self = this;
        self.hello = "HELLO, our TODO App started =)";
    });