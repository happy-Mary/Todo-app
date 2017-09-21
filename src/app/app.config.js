// // ng-route
import mainModule from './app.module';
import todoTemplate from './todo.html';

export default mainModule
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/lists/marked");
        $stateProvider
            .state('lists',{
                url: '/lists',
                template: todoTemplate
            })
            .state('lists.todo', {
                url: '/:listid',
                template: '<todo-comp></todo-comp>'
            })
            .state('lists.filter', {
                url: '/filter',
                // template: todoTemplate
                template: '<todo-comp filter-search = ctrl.searchItem></todo-comp>'
            })
            .state('lists.filter.search', {
                url: '/?param',
                // template: '<todo-comp filter-search = ctrl.searchItem></todo-comp>'
                template: '<p>{{ctrl.searchItem}}</p>'
            });
    }
]);