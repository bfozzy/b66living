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
  .controller("testCtrl", function($scope, $state){
    $scope.go = function(){
      $state.go('projects')
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
            //projData will turn the form in to an object that can be passed to the service
            var projData = {
              name: name,
              startDate: startDate,
              deadline: deadline
            };
            mainService.createProj(projData).then(function(res){
              console.log(res);
              if(res.status === 200){
                alert("Project Added")
              }
              else { //this part isn't working. If the post fails it just gives an error in the console with the err status
                alert("There was a problem processing your request")
              }
            })

          };
        }
      };
    })

angular.module("b66Living")
  .directive("projectSummaries", function(){
      return {

        templateUrl: "./templates/directiveTemplates/projectSummaries.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService){
          $scope.getProjects = function(){
            mainService.showProjects()
            .then(function(res){
              console.log(res.data);
              $scope.projects = res.data;
            })
          }()
        }
      };
    })

angular.module("b66Living")
  .service("mainService", function($http){
    this.serviceTest = "Service Is Working!";

    this.createProj = function(data){
      return $http.post("admin/project/new", data)
    }
    this.showProjects = function(){
    return $http.get("admin/projects")
    }
  })
