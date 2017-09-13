import folderFormModule from '../folder-form/folderform.module';
import listFormModule from '../list-form/listform.module';
require('../folder-form/folderform.controller');
require('../folder-form/folderform.component');
require('../list-form/listform.controller');
require('../list-form/listform.component');

export default angular.module('modalModule', [folderFormModule.name, listFormModule.name]);