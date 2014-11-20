(function() {
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'hotsheetCtrl',
        controllerAs: 'hotsheet'
      });
  }

  angular.module('hotsheet',['ngRoute'])
    .config(['$routeProvider', config]);
}());