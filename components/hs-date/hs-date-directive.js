(function(){
  'use strict';

  function hsDate(dateFilter) {
    function link(scope, element, attrs) {
      var currentDate = new Date();
      element.text(dateFilter(currentDate, 'EEE, MMM d, yyyy'));
    }

    return {
      restrict: 'E',
      scope: {
        due: '='
      },
      //templateUrl: 'components/hs-date/hs-date.html',
      link: link
    };
  }

  angular.module('hotsheet.hsDate',[])
    .directive('hsDate', ['dateFilter', hsDate]);
}());