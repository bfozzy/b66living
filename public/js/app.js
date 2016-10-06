angular.module("b66Living", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/")
    $stateProvider
    .state("home", {
      templateUrl: "templates/routeTemplates/home.html",
      url: "/"
    })
      .state("projects", {
        templateUrl: "templates/routeTemplates/projects.html",
        url: "/admin/projects"
      })
      .state("addProject", {
        templateUrl: "templates/routeTemplates/newProject.html",
        url: "/admin/projects/new"
      })
      .state("addCustomer", {
        templateUrl: "templates/routeTemplates/addCustomerView.html",
        url: "/admin/projects/:id/customer/new"
      })
      .state("seeProject", {
        templateUrl: "templates/routeTemplates/projectDetail.html",
        url: "/admin/projects/:id"
      });
  });
