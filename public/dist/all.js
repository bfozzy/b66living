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
        url: "/admin/project/new"
      })

  })

angular.module("b66Living")
  .service("mainService", function($http){
    this.serviceTest = "Service Is Working!"
    this.createProj = function(data){

    $http.post("admin/project/new", data).then(function(response){

    })
  }
  })

angular.module("b66Living")
  .directive("addProjectDirective", function(){
      return {

        templateUrl: "./templates/directiveTemplates/addProject.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService){
          //controller is working
          $scope.newproj = function(name, startDate, deadline){
            var projData = {
              name: name,
              startDate: startDate,
              deadline: deadline
            }
              mainService.createProj(projData).then()
          }
        }

      };

  })
