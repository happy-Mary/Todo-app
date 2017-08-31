import listModule from './list.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';
import listService from './list.service';

export default listModule
    .controller('listController', function listController($http, localStorageService, listService) {
        let self = this;
        self.lists;
        self.addActive = false;
        self.newListTitle = '';

         // take id through $routeProvider
        let filterById = 0;
        self.filterData = function(item) {
            if(item.listGroupId === filterById){
                return item;
            }
        };

        self.addList = function() {
            self.addActive = true;
        };

        self.saveList = function() {
            console.log(self.newListTitle);
            listService.create(self.newListTitle);
            // save to LS
            self.addActive = false;
            self.newListTitle = '';
        };

        self.deleteList = function(id){
            listService.delete(id);
            // update LS
        };

        self.rewriteList = function(id) {

        };
        
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