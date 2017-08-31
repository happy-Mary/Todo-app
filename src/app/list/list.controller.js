import listModule from './list.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';
import listService from './list.service';

export default listModule
    .controller('listController', function listController($http, localStorageService, listService) {
        let self = this;
        self.lists;
        self.openInput = false;
        self.newTitle = '';

         // take id through $routeProvider
        //  let parentId = $routeParams.id;
        let parentId = 0;
        self.filterData = function(item) {
            if(item.listGroupId === parentId){
                return item;
            }
        };

        self.saveList = function() {
            console.log(self.newTitle);
            self.lists = listService.create(self.newTitle);
            console.log(self.lists);
            localStorageService.set('lists', self.lists);
            // save to LS
            self.openInput = false;
            self.newTitle = '';
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