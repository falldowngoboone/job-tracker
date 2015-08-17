// the hope is this will provide services for the clients array

(function () {
  var clients;

  clients = function ( dataService ) {


    return {
      add    : add,
      remove : remove
    };
  }

  angular.module( 'hotsheet', [ 'services' ] )
    .factory( 'hotsheetClients', [ 'dataService', clients ] );
}());