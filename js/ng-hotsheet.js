var hotsheet = angular.module('hotsheet',[]);

hotsheet.controller('hotsheetCtrl', ['$scope', '$http', function($scope, $http){

  $http.get('/data/hotsheet.json')
    .success(function(data){
      $scope.clients = data.accounts;
    });

  var date = new Date();
  $scope.date = date.toDateString();

}]);