(function() {
  function hotsheetCtrl($window, dataServices){

    // Resolving in the Controller is bad. This should be handled by
    // $routeProvider service using resolve.
    var self = this;

    dataServices.get()
     .success(function(data){
       self.clients = data;
     });
    this.save = dataServices.saveJSON(this.clients);


    this.date = new Date();

    this.toggleEdit = function(context) {
      if(context.edit) {
        delete context.edit;
        this.save();
      } else {
        context.edit = true;
      }
    };

    this.todayJobs = function() {
      return {edit: false};
    };

    this.hotsheetJobs = function() {
      return {edit: false};
    };

    this.addClient = function(self) {
      this.clients.push({
        name:'New Client',
        projects:[],
        today:[]
      });
      this.toggleEdit(self);
    };
    this.deleteClient = function(client) {
      if ($window.confirm("Delete Client?")) {
        var clientIndex = this.clients.indexOf(client);
        this.clients.splice(clientIndex, 1);
      }
      this.save();
    };

    this.addToday = function(client) {
      client.today.unshift({item:'new'});
      this.toggleEdit(client.today);
    };
    this.deleteToday = function(job, client) {
      if ($window.confirm("Delete Today item?")) {
        var clientIndex = this.clients.indexOf(client);
        var jobIndex = this.clients[clientIndex].today.indexOf(job);

        this.clients[clientIndex].today.splice(jobIndex, 1);

      }
      this.save();
    };

    this.addProject = function(client) {
      client.projects.unshift({name:'new'});
      this.toggleEdit(client);
    };
    this.deleteProject = function(project, client) {
      if ($window.confirm("Delete Project?")) {
        var clientIndex = this.clients.indexOf(client);
        var projectIndex = this.clients[clientIndex].projects.indexOf(project);

        this.clients[clientIndex].projects.splice(projectIndex, 1);

      }
      this.save();
    };

    this.addTask = function(project){
      if(!project.tasks){
        project.tasks = [];
      }
      project.tasks.unshift({item:'New task'});
    };
    this.deleteTask = function(task, project, client) {
      if ($window.confirm("Delete Task?")) {
        var clientIndex = this.clients.indexOf(client);
        var projectIndex = this.clients[clientIndex].projects.indexOf(project);
        var taskIndex = this.clients[clientIndex].projects[projectIndex].tasks.indexOf(task);

        this.clients[clientIndex].projects[projectIndex].tasks.splice(taskIndex, 1);

      }
      this.save();
    };

    this.addMeeting = function(client) {
      if (!client.meeting) {
        client.meeting = {date:"???"};
      }
      this.toggleEdit(client);
    };
    this.deleteMeeting = function(client) {
      delete client.meeting;
      this.save();
    };

    this.addBoard = function(client) {
      if (!client.meeting.boards) {
        client.meeting.boards = [];
      }
      client.meeting.boards.push({board:"New board"});
    };

  }

  angular.module('hotsheet')
    .controller('hotsheetCtrl', ['$window', 'dataServices', hotsheetCtrl]);
}());