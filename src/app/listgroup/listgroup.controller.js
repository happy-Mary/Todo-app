import listGroupModule from './listgroup.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http, localStorageService) {
        var self = this;
        if(localStorageService.get('listGroups')){
            self.listGroups = localStorageService.get('listGroups');
        }
        else{
             $http({ method: 'GET', url: URLS.listGroupURL })
                .then(function successCallback(response) {
                    self.listGroups = response.data;
                }, function errorCallback() {
                    // console.log("request FAILED");
                    // self.listGroups = require('../../app-data/listGroups.json');
                    self.listGroups =  [];
                });
        }

    });

