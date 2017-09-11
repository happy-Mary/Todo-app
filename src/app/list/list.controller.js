import listModule from './list.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';
import listService from './list.service';

export default listModule
    .controller('listController', function listController($http, localStorageService, listService,  modalService,  routeService) {
        let self = this;
        self.lists;
        self.openInput = false;
        self.newTitle = '';

        // ////////////////////////////////////
        // service to open modal and getting routeParams
        self.modal = modalService;
        self.routeData = routeService.get();
        // //////////////////////////////////
        self.newList = function(title){
            listService.create(title);
            let serviceObj = listService.get();
        };
        // self.saveList = function() {
        //     self.lists = listService.create(self.newTitle, parentId);
        //     localStorageService.set('lists', self.lists);
        //     self.openInput = false;
        //     self.newTitle = '';
        // };

        // self.deleteList = function(id){
        //     self.lists = listService.delete(id);
        //     localStorageService.set('lists', self.lists);
        // };

        // self.rewriteList = function(id) {
        //     self.openInput = true;
        //     listService.get(id);
        // };

        // self.changeList = function(){
        //     self.lists = listService.update(self.newTitle);
        //     localStorageService.set('lists', self.lists);
        //     self.openInput = false;
        //     self.newTitle = '';
        // };
        

        function InitPage(){
            if(localStorageService.get('lists')) {
                self.lists = localStorageService.get('lists');
                listService.set(self.lists);
            } else {
                $http({ method: 'GET', url: URLS.listURL })
                .then(function successCallback(response) {
                    self.lists = response.data;
                    localStorageService.set('lists', self.lists);
                    listService.set(self.lists);
                })
                .catch(function errorCallback() {
                    console.log("request FAILED");
                    self.lists = [];
                    localStorageService.set('lists', self.lists);
                    listService.set(self.lists);
                });
            }
        }

        InitPage();


    });