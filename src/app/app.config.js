// // ng-route
import mainModule from './app.module';

export default mainModule
.config(['$locationProvider', '$routeProvider',
function config($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider
  .when('/lists/:listid', {
      template: '<todo-comp></todo-comp>'
    })
  .otherwise('lists/marked');
}
]);