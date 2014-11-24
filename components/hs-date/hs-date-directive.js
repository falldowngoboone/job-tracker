// hsDate directive
// Format: <hs-date [date] [format]>[Template text]</hs-date>
// Attributes:
  // date (DEFAULT: current date) - accepts JavaScript appropriate format (currently UTC)
  // format (DEFAULT: set in format variable below) - any accepted AngularJS date filter
    // format (https://docs.angularjs.org/api/ng/filter/date)
// Template:
  // Accepts any text or html
  // %date% - placeholder for specified date (default or date attribute)

// Examples:

  // No date attribute, default formatting
  // <hs-date></hs-date>
    // -> Outputs current date in 'MM/dd' format

  // Specific date, default formatting
  // <hs-date date="2002-11-23"></hs-date>
    // -> 11/23

  // Specific date, custom formatting
  // <hs-date date="2002-11-23" format="fullDate"></hs-date>
    // -> Saturday, November 23, 2002

  // With templating
  // <hs-date date="2002-11-23" format="fullDate">My wedding was: <time datetime="2002-11-23">%date%</time>.</hs-date>
    // -> My wedding was: <time datetime="2002-11-23">Saturday, November 23, 2002</time>.

(function(){
  'use strict';

  function hsDate(dateFilter) {
    function link(scope, element, attrs) {
      var today = new Date(),
          format = attrs.format || 'MM/dd';

      var localizeDate = function(date) {
        if (!date) {
          return false;
        } else {
          var gmtDate = new Date(date),
              localOffset = today.getTimezoneOffset() * 60 * 1000, // in milliseconds
              localDate = new Date(gmtDate.getTime() + localOffset);

          return localDate;
        }
      };

      var date = localizeDate(attrs.date) || today;

      // If date is set and less than or equal to today, add late class
      if (attrs.date && date <= today) {
        element.addClass("late");
      }

      // Templating with %date%
      if (!element.text()) {
        element.html(dateFilter(date, format));
      } else {
        // Template out hs-date with %date% placeholder in element text
        var html = element.html().replace(/(\%date\%)/g, dateFilter(date, format));
        element.html(html);
      }

    }

    return {
      restrict: 'EA',
      link: link
    };
  }

  angular.module('hotsheet.hsDate',[])
    .directive('hsDate', ['dateFilter', hsDate]);
}());