(function(){
  function dataServices($http){
    var dataServices = {};

    dataServices.get = function() {
      return $http.get('/data/hs-data.json');
    };
    dataServices.saveJSON = function(clients) {
      this.clients = clients;
      return function() {
        var data = JSON.stringify(this.clients, null, 2);
        $http.post('/scripts/writeJSON.php', data);
      };
    };

    return dataServices;
  }

  angular.module('hotsheet')
    .factory('dataServices', ['$http', dataServices]);
}());