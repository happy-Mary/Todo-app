import angular from 'angular';
import 'normalize.css';
import './sass/style.scss';

import appModule from './app/app.module';
require('./app/app.controller');
require('./app/list/list.controller');
require('./app/listgroup/listgroup.controller');
require('./app/todo/todo.controller');

angular.module('todoModule', [appModule.name]);