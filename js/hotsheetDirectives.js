(function(){

  function dueDate() {
    return {
      restrict: 'E',
      template: 'This is a due-date.'
    };
  }

  angular.module('hotsheet')
    .directive('dueDate', dueDate);
}());