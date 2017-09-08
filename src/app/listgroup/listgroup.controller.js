import listGroupModule from './listgroup.module';
import { URLS } from '../constants';
import localStorageService from '../app.service';
import listGroupService from './listgroup.service';

export default listGroupModule
    .controller('listGroupController', function listGroupController($http, localStorageService, listGroupService) {
        var self = this;
        self.folderClose = true;
        self.open = function(event) {

            let folderLink = angular.element(event.currentTarget);

            if (folderLink.hasClass('folder-item')) {
                console.log('We need this link');
                console.log(folderLink);
                let folderItem = folderLink.parent();
                (folderItem.hasClass('folder-close')) ? folderItem.removeClass('folder-close'): folderItem.addClass('folder-close');
            }

        }


        self.save = function() {
            localStorageService.set('listGroups', self.listGroups);
        }
        self.deleteLisGroup = function(id) {
            listGroupService.deleteGroup();
            self.save();
        }
        if (localStorageService.get('listGroups')) {
            self.listGroups = localStorageService.get('listGroups');
            listGroupService.set(self.listGroups);
            listGroupService.getGroup(0);
        } else {
            $http({ method: 'GET', url: URLS.listGroupURL })
                .then(function successCallback(response) {
                    self.listGroups = response.data;
                    // localStorageService.set('listGroups', self.listGroups);
                    self.save();
                    listGroupService.set(self.listGroups);
                    listGroupService.getGroup(0);
                })
                .catch(function errorCallback() {
                    // console.log("request FAILED");
                    // self.listGroups = require('../../app-data/listGroups.json');
                    self.listGroups = [];
                    self.save();
                });
        }
        // listGroupService.set(self.listGroups);
        // listGroupService.create('adsadad');
        // listGroupService.getGroup(0);

    });