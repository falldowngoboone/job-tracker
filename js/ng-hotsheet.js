var hotsheet = angular.module('hotsheet',[]);

hotsheet.controller('hotsheetCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

  $http.get('/data/test.json')
    .success(function(data){
      $scope.clients = data;
    });

  $scope.save = function() {
    var data = JSON.stringify($scope.clients, null, 2);
    $http.post('/scripts/writeJSON.php', data);
  };

  $scope.date = new Date();

  $scope.toggleEdit = function(context) {
    if(context.edit) {
      delete context.edit;
      $scope.save();
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
    $scope.save();
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
    $scope.save();
  };

  $scope.addTask = function(project){
    if(!project.tasks){
      project.tasks = [];
    }
    project.tasks.unshift({item:'New task'});
  };
  $scope.deleteTask = function(task, project, client) {
    if ($window.confirm("Delete Task?")) {
      var clientIndex = $scope.clients.indexOf(client);
      var projectIndex = $scope.clients[clientIndex].projects.indexOf(project);
      var taskIndex = $scope.clients[clientIndex].projects[projectIndex].tasks.indexOf(task);

      $scope.clients[clientIndex].projects[projectIndex].tasks.splice(taskIndex, 1);

    }
    $scope.save();
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
    $scope.save();
  };

  $scope.addMeeting = function(client) {
    if (!client.meeting) {
      client.meeting = {date:"???"};
    }
    $scope.toggleEdit(client);
  };
  $scope.deleteMeeting = function(client) {
    delete client.meeting;
    $scope.save();
  };

  $scope.addBoard = function(client) {
    if (!client.meeting.boards) {
      client.meeting.boards = [];
    }
    client.meeting.boards.push({board:"New board"});
  };

}]);