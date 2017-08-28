import angular from 'angular';
import './sass/style.scss';

import appModule from './app/app.module';
require('./app/app.controller');

angular.module('todoModule', [appModule.name]);