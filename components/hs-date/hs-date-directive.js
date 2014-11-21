(function(){

  function hsDate() {
    return {
      restrict: 'E',
      scope: {
        hsDue: '=due'
      },
      templateUrl: 'components/hs-date/hs-date.html'
    };
  }

  angular.module('hotsheet.hsDate',[])
    .directive('hsDate', hsDate);
}());