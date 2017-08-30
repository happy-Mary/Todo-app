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
                    localStorageService.set('listGroups', self.listGroups);

                })
                .catch(function errorCallback() {
                    // console.log("request FAILED");
                    // self.listGroups = require('../../app-data/listGroups.json');
                    self.listGroups =  [];
                });
        }

    });

