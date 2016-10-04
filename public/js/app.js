angular.module("b66Living", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/")
    $stateProvider
      .state("projects", {
        templateUrl: "js/routeTemplates/projects.html",
        url: "/admin/projects"
      })
      .state("addProject", {
        templateUrl: "js/routeTemplates/newProject.html",
        url: "/admin/project/new"
      })

  })
