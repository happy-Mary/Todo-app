import angular from 'angular';
import 'normalize.css';
import './sass/style.scss';

import mainModule from './app/app.module';

require('./app/app.config');
require('./app/app.controller');
require('./app/app.service');
require('./app/main.controller');
require('./app/directives/contextmenu.directive');
require('./app/directives/fileinput.directive');
require('./app/directives/autoheight.directive');
require('./app/app.socket');

/* this module goes to html ng-app, it takes all main modules from app */
angular.module('appModule', [mainModule.name]);