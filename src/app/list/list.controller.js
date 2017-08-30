import listModule from './list.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';
import listService from './list.service';

export default listModule
    .controller('listController', function listController($http, localStorageService, listService) {
        let self = this;
        self.lists;

         // take id through $routeProvider
        let filterById = 0;
        self.filterData = function(item) {
            if(item.listGroupId === filterById){
                return item;
            }
        };

        self.addList = function() {
            listService.create(id);
        };

        self.deleteList = function(id){
            listService.delete(id);
            // update LS
        };
        // /////////////////////////////////////////
        
        if(localStorageService.get('lists')){
            self.listGroups = localStorageService.get('lists');
            listService.set(self.lists);
        }
        else{
	        $http({ method: 'GET', url: URLS.listURL })
	            .then(function successCallback(response) {
	                self.lists = response.data;
                    localStorageService.set('lists', self.lists);
                    listService.set(self.lists);
                })
                .catch(function errorCallback() {
	                // console.log("request FAILED");
	                // self.lists = require('../../app-data/lists.json');
                    self.lists = [];
                    listService.set(self.lists);
	            });
        }

    });