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
