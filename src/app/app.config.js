// // ng-route
import mainModule from './app.module';

export default mainModule
// .config(['$locationProvider', '$routeProvider',
// function config($locationProvider, $routeProvider) {
//   // $locationProvider.hashPrefix('!');
//   $locationProvider.html5Mode(true);
//   $routeProvider
//   .when('/lists/:listid', {
//       template: '<todo-comp></todo-comp>',
//       resolve: {
//         message: function($route, routeService) {
//           routeService.setlistid($route.current.params.listid);
//         }
//       }
//     })
//   .otherwise('lists/marked');
// }
// ]);
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        // $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/state1");
        // $stateProvider
        // .when('/lists/:listid', {
        //     template: '<todo-comp></todo-comp>',
        //     resolve: {
        //         message: function($route, routeService) {
        //             routeService.setlistid($route.current.params.listid);
        //         }
        //     }
        // })
        // .otherwise('lists/marked');
    }
]);