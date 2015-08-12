/**
 * app.js
 *
 * Ryan Boone
 * falldowngoboone@gmail.com
 *
 * Initiates the hotsheet app, as well as routing.
 */

(function() {
  var config;

  config = function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/hotsheet.html',
        controller: 'hotsheetCtrl',
        controllerAs: 'hotsheet'
      });
  };

  angular.module('hotsheet',['ngRoute', 'hotsheet.hsDate'])
    .config(['$routeProvider', config]);
}());