// this will be a standalone service module that will provide universal services
// such as the dataService that's been started

(function () {
  var dataService;

  dataService = function () {

    return {
      get  : get,
      save : save
    }
  }

  angular.module( 'services', [] )
    .factory( 'dataService', [ dataService ] );
}());