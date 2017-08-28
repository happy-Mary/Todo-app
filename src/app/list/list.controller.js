import listModule from './list.module';
import { URLS } from '../constants';

export default listModule
    .controller('listController', function listController($http) {
        let self = this;
        $http({ method: 'GET', url: URLS.listURL })
            .then(function successCallback(response) {
                self.lists = response.data;
            }, function errorCallback() {
                console.log("request FAILED");
                self.lists = require('../../app-data/lists.json');
            });
    });