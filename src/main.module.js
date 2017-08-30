import angular from 'angular';
import 'normalize.css';
import './sass/style.scss';

import mainModule from './app/app.module';
require('./app/app.controller');
require('./app/listgroup/listgroup.controller');
require('./app/listgroup/listgroup.component');
require('./app/list/list.controller');
require('./app/list/list.component');
require('./app/todo/todo.controller');
require('./app/todo/todo.component');


/* this module goes to html ng-app */
angular.module('appModule', [mainModule.name]);