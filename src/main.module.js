import angular from 'angular';
import 'normalize.css';
import './sass/style.scss';

import appModule from './app/app.module';
require('./app/app.controller');
require('./app/list/list.controller');
require('./app/todo/todo.controller');
require('./app/listgroup/listgroup.controller');



// import data from './app-data/lists.json';
// console.log(data);

angular.module('todoModule', [appModule.name]);