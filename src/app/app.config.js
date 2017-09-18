// // ng-route
import mainModule from './app.module';
import todoTemplate from './todo.html';

export default mainModule
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/lists");
        $stateProvider
            .state('lists',{
                url: '/lists',
                template: todoTemplate
            })
            .state('lists.todo', {
                url: '/:listid',
                template: '<todo-comp></todo-comp>'
        });
    }
]);