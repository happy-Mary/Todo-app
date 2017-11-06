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
                    controller: 'AppController as ctrl',
                    resolve: {
                        dataFolders: function getData(listGroupService) {
                            return listGroupService.register();
                        },
                        dataLists: function getData(listService) {
                            return listService.register();
                        },
                        dataTasks: function getData(todoService, $stateParams) {
                            return todoService.register($stateParams.listid);
                        }
                    }
                })
                .state('lists.todo', {
                    url: '/todo/:todoid',
                    template: '<todoside-comp></todoside-comp>',
                    resolve: {
                        subtaskData: function getData(subtaskService, $stateParams) {
                            return subtaskService.register($stateParams.todoid);
                        }
                        // filesData: function getData(filesService) {
                        //     return filesService.register();
                        // }
                    }
                });

                // .state('filter', {
                //     url: '/filter?search',
                //     template: todoTemplate,
                //     controller: 'AppController as ctrl',
                //     params: {
                //         search: {
                //             // value: '',
                //             // squash: true
                //         }
                //     },
                //     reloadOnSearch: false
                // })
        }
    ]);