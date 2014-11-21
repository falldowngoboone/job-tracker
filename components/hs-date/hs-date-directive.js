(function(){

  function hsDate() {
    return {
      restrict: 'E',
      scope: {
        due: '='
      },
      templateUrl: 'components/hs-date/hs-date.html'
    };
  }

  angular.module('hotsheet.hsDate',[])
    .directive('hsDate', hsDate);
}());