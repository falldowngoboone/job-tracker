var hotsheet = angular.module('hotsheet',[]);

hotsheet.controller('hotsheetCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

  $http.get('/data/hotsheet.json')
    .success(function(data){
      $scope.clients = data.accounts;
    });

  var date = new Date();
  $scope.date = date.toDateString();

  $scope.toggleEdit = function(context) {
    if(context.edit) {
      delete context.edit;
    } else {
      context.edit = true;
    }
  };

  $scope.addToday = function(client) {
    client.today.unshift({item:'new'});
    $scope.toggleEdit(client.today);
  };
  $scope.deleteToday = function(job, client) {
    if ($window.confirm("Delete Today item?")) {
      var clientIndex = $scope.clients.indexOf(client);
      var jobIndex = $scope.clients[clientIndex].today.indexOf(job);

      $scope.clients[clientIndex].today.splice(jobIndex, 1);

    }
  };

  $scope.addProject = function(client) {
    client.projects.unshift({name:'new'});
    $scope.toggleEdit(client);
  };
  $scope.deleteProject = function(project, client) {
    if ($window.confirm("Delete Project?")) {
      var clientIndex = $scope.clients.indexOf(client);
      var projectIndex = $scope.clients[clientIndex].projects.indexOf(project);

      $scope.clients[clientIndex].projects.splice(projectIndex, 1);

    }
  };

  $scope.deleteTask = function(task, project, client) {
    if ($window.confirm("Delete Task?")) {
      var clientIndex = $scope.clients.indexOf(client);
      var projectIndex = $scope.clients[clientIndex].projects.indexOf(project);
      var taskIndex = $scope.clients[clientIndex].projects[projectIndex].tasks.indexOf(task);

      $scope.clients[clientIndex].projects[projectIndex].tasks.splice(taskIndex, 1);

    }
  };

  $scope.deleteClient = function(client) {
    if ($window.confirm("Delete Client?")) {
      var oldArr = $scope.clients;
      $scope.clients = [];
      oldArr.forEach(function(el){
        if (el.name !== client.name) {
          $scope.clients.push(el);
        }
      });
    }
  };

  $scope.addMeeting = function(client) {
    if (!client.meeting) {
      client.meeting = {date:"???"};
    }
    $scope.toggleEdit(client);
  };
  $scope.deleteMeeting = function(client) {
    delete client.meeting;
  };

}]);