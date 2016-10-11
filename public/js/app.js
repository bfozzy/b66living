angular.module("b66Living", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    //Rule to avoid trailing '/' in url
    $urlRouterProvider.rule(function($injector, $location) {

    var path = $location.path();
    var hasTrailingSlash = path[path.length-1] === '/';

    if(hasTrailingSlash) {

      //if last charcter is a slash, return the same url without the slash
      var newPath = path.substr(0, path.length - 1);
      return newPath;
    }

  });
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
