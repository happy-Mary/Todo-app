import listModule from './list.module';

export default listModule
    .controller('listController', function AppController() {
        let self = this;
        self.helloList = "it's list controller";
    });