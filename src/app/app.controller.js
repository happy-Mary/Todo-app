import appModule from './app.module';

export default appModule
    .controller('AppController', function AppController() {
        const cityList = this;
        cityList.hello = "HELLO We are here";
    });