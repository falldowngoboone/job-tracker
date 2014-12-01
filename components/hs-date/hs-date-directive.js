// hsDate directive
// Format: <hs-date [date] [format]></hs-date>
// Attributes:
  // date (DEFAULT: current date) - accepts any JavaScript appropriate format
  // format (DEFAULT: set in format variable below) - any accepted AngularJS date filter
    // format (https://docs.angularjs.org/api/ng/filter/date)

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

  // Templating the format
  // <hs-date date="2002-11-23" format="(ATV MM/dd)"></hs-date>
    // -> (ATV ll/23)


(function(){
  'use strict';

  function hsDate(dateFilter) {
    function link(scope, element, attrs) {

      // This function transforms a date built in UTC with no specified time
      // to display at the locale of the browser viewing it. Not very good
      // for international applications. Perhaps specifying a time is a better
      // solution.
      var localizeDate = function(date) {
        var today = new Date();

        if (!date) {
          return false;
        } else {
          var gmtDate = new Date(date);

          if (isNaN(gmtDate.getTime())){
            console.log("Value " + date + " is not a valid date.");
            return "string";
          } else {
            var localOffset = today.getTimezoneOffset() * 60 * 1000, // in milliseconds
                localDate = new Date(gmtDate.getTime() + localOffset);

            return localDate;
          }
        }
      };

      var setDate = function(val) {
        var today = new Date(),
            date = localizeDate(val) || today,
            format = attrs.format || 'MM/dd';

        if (date === "string") {
          element.text(val);
        } else {
          element.text(dateFilter(date, format));
        }
        // If date is set and less than or equal to today, add late class
        if (val && date <= today) {
          element.addClass("late");
        } else {
          element.removeClass("late");
        }

      };

      // setDate(attrs.date);
      attrs.$observe('date', function(v){
        setDate(v);
      });

    }

    return {
      restrict: 'EA',
      link: link
    };
  }

  angular.module('hotsheet.hsDate',[])
    .directive('hsDate', ['dateFilter', hsDate]);
}());