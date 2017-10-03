import angular from 'angular';
import 'normalize.css';
import './sass/style.scss';

import mainModule from './app/app.module';

require('./app/app.config');
require('./app/app.controller');
require('./app/app.service');

/* this module goes to html ng-app, it takes all main modules from app */
angular.module('appModule', [mainModule.name]);