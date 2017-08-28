import listModule from './list.module';

import data from '../../app-data/lists.json';


export default listModule
    .controller('listController', function AppController() {
        let self = this;
        self.helloList = "it's list controller";
        self.lists = data;
        console.log(data);
    });