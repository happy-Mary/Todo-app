import listGroupModule from './listgroup.module';
import { URLS } from '../constants';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http) {
        var self = this;
        $http({ method: 'GET', url: URLS.listGroupURL })
            .then(function successCallback(response) {
                self.listGroups = response.data;
            }, function errorCallback() {
                console.log("request FAILED");
                self.listGroups = require('../../app-data/listGroups.json');
            });
    });

