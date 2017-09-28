// // ng-route
import mainModule from './app.module';
import todoTemplate from './todo.html';

export default mainModule
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
        function config($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("/lists/marked");
            $stateProvider
                .state('lists', {
                    url: '/lists',
                    template: todoTemplate,
                    abstract: true,
                    controller: 'AppController as ctrl',
                    resolve: {
                        dataFolders: function getData(listGroupService) {
                            return listGroupService.register();
                        },
                        dataLists: function getData(listService) {
                            return listService.register();
                        }
                    }
                })
                .state('lists.todo', {
                    url: '/:listid',
                    template: '<todo-comp></todo-comp>'
                })
                .state('lists.filter', {
                    url: '/filter/:search',
                    template: '<todo-comp></todo-comp>'
                });
        }
    ]);