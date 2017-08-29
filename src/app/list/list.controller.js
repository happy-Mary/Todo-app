import listModule from './list.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';

export default listModule
    .controller('listController', function listController($http, localStorageService) {
        let self = this;

        if(localStorageService.get('lists')){
            self.listGroups = localStorageService.get('lists');
        }
        else{
	        $http({ method: 'GET', url: URLS.listURL })
	            .then(function successCallback(response) {
	                self.lists = response.data;
	                localStorageService.set('lists', self.lists);
	            }, function errorCallback() {
	                // console.log("request FAILED");
	                // self.lists = require('../../app-data/lists.json');
	                self.lists = [];
	            });
        }

    });