(function() {
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/hotsheet/hotsheet.html',
        controller: 'hotsheetCtrl',
        controllerAs: 'hotsheet'
      });
  }

  angular.module('hotsheet',['ngRoute', 'hotsheet.hsDate'])
    .config(['$routeProvider', config]);
}());