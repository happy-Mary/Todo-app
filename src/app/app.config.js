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
                        dataTasks: function getData($q, todoService, $stateParams) {
                            return todoService.register($stateParams.listid);
                        }
                    }
                })
                .state('lists.todo', {
                    url: '/todo/:todoid',
                    template: '<todoside-comp></todoside-comp>',
                    resolve: {
                        subtaskData: function getData($state, $q, subtaskService, $stateParams) {
                            // return subtaskService.register($stateParams.todoid);
                            // IF ERROR ON REGISTER
                            const deferred = $q.defer();
                            subtaskService.register($stateParams.todoid).then(function (gotData) {
                                if (gotData) {
                                    deferred.resolve();
                                } else {
                                    // deferred.reject('Not logged in');
                                    $state.go('lists', { listid: 'marked' });
                                }
                            });
                            return deferred.promise;
                        },
                        filesData: function getData(filesService, $stateParams) {
                            return filesService.register($stateParams.todoid);
                        }
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