(function(){
  function hotsheetServices($http){
    var hotsheetServices = {};

    hotsheetServices.get = function() {
      return $http.get('/data/hs-data.json');
    };
    hotsheetServices.saveJSON = function(clients) {
      this.clients = clients;
      return function() {
        var data = JSON.stringify(this.clients, null, 2);
        $http.post('/scripts/writeJSON.php', data);
      };
    };

    return hotsheetServices;
  }

  angular.module('hotsheet')
    .factory('hotsheetServices', ['$http', hotsheetServices]);
}());