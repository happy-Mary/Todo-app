import mainModule from './app.module';
import todoTemplate from './todo.html';

export default mainModule
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
        function config($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("/lists/marked");
            $stateProvider
                .state('lists', {
                    url: '/lists/:listid',
                    template: todoTemplate,
                    // abstract: true,
                    controller: 'AppController as ctrl',
                    resolve: {
                        dataFolders: function getData(listGroupService) {
                            return listGroupService.register();
                        },
                        dataLists: function getData(listService) {
                            return listService.register();
                        },
                        dataTasks: function getData(todoService) {
                            return todoService.register();
                        }
                    }
                })
                .state('filter', {
                    url: '/filter?search',
                    template: todoTemplate,
                    controller: 'AppController as ctrl',
                    params: {
                      search: {
                        // value: '',
                        // squash: true
                      }
                    },
                    reloadOnSearch: false
                });
        }
    ]);