var hotsheet = angular.module('hotsheet',[]);

hotsheet.controller('hotsheetCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

  $http.get('/data/hotsheet.json')
    .success(function(data){
      $scope.clients = data.accounts;
    });

  var date = new Date();
  $scope.date = date.toDateString();

  $scope.toggleEdit = function(context) {
    if(context.edit) {
      delete context.edit;
    } else {
      context.edit = true;
    }
  };

  $scope.addToday = function(client) {
    client.today.unshift({item:'new'});
  };

  $scope.deleteClient = function(client) {
    if ($window.confirm("Delete Client?")) {
      var oldArr = $scope.clients;
      $scope.clients = [];
      oldArr.forEach(function(el){
        if (el.name !== client.name) {
          $scope.clients.push(el);
        }
      });
    }
  };

}]);