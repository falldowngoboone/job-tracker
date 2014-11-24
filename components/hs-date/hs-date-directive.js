(function(){
  'use strict';

  function hsDate(dateFilter) {
    function link(scope, element, attrs) {
      var currentDate = new Date(),
          localTime = currentDate.getTime(),
          localOffset = currentDate.getTimezoneOffset() * 60 * 1000, // in milliseconds
          format = 'MM/dd';

      if (attrs.date) {
        var date = new Date(attrs.date),
            // convert the date attribute, which is GMT midnight, to local midnight
            // or else it shows previous day
            dateLocal = new Date(date.getTime() + localOffset);

        element.text(dateFilter(dateLocal, format));

        if (dateLocal <= currentDate) {
          element.addClass("late");
        }
      } else {
        element.text(dateFilter(currentDate, format));
      }
    }

    return {
      restrict: 'EA',
      // scope: {
      //   due: '='
      // },
      //templateUrl: 'components/hs-date/hs-date.html',
      link: link
    };
  }

  angular.module('hotsheet.hsDate',[])
    .directive('hsDate', ['dateFilter', hsDate]);
}());