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
        //  let parentId = $routeParams.id;
        let parentId = 0;

        self.filterData = function(item) {
            if(item.listGroupId === parentId){
                return item;
            }
        };

        self.saveList = function() {
            self.lists = listService.create(self.newTitle, parentId);
            localStorageService.set('lists', self.lists);
            self.openInput = false;
            self.newTitle = '';
        };

        self.deleteList = function(id){
            self.lists = listService.delete(id);
            localStorageService.set('lists', self.lists);
        };

        self.rewriteList = function(id) {
            console.log(id);
            self.openInput = true;
            listService.get(id);
        };

        self.changeList = function(){
            console.log(self.newTitle);
            listService.update(self.newTitle);
        };
        

        function InitPage(){
            let data = localStorageService.get('lists');

            if(data !== null) {
                self.lists = data;
                listService.set(self.lists);
                console.log('its in LS');
                console.log(self.lists);
            } else {
                $http({ method: 'GET', url: URLS.listURL })
                .then(function successCallback(response) {
                    self.lists = response.data;
                    localStorageService.set('lists', self.lists);
                    listService.set(self.lists);
                })
                .catch(function errorCallback() {
                    console.log("request FAILED");
                    // self.lists = require('../../app-data/lists.json');
                    self.lists = [];
                    localStorageService.set('lists', self.lists);
                    listService.set(self.lists);
                });
            }
        }

        InitPage();


    });