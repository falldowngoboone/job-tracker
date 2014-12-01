(function() {
  function hotsheetCtrl($window, hotsheetServices){

    // TODO: Resolving in the Controller is bad. This should be handled by
      // $routeProvider service using resolve.
    var self = this;

    // TODO: hotsheetServices implies it's in a file called hotsheetServices. It doesn't
      // exist. Create a hotsheetServices module, then decorate it in hotsheetServices.
    hotsheetServices.get()
     .success(function(data){
       self.clients = data;
     });
    this.save = hotsheetServices.saveJSON(this.clients);

    // TODO: Separate toggleEdit out into a service. Perhaps change how
      // it operates to an "edit" event broadcaster/listener?

    // TODO: Separate the objects into services (Client, Project, Job,
      // Meeting (basically a separate Project type)). This may be a good time
      // to 86 the Today jobs and go to a Jobs-based system.
      // Also a good time to transform the Hotsheet module into a strict
      // email-generation service.

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
    .controller('hotsheetCtrl', ['$window', 'hotsheetServices', hotsheetCtrl]);
}());