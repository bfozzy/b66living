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
            });
          }(),
          $scope.goToProject = function(projectId){
            // ng-go or something like that
            // $state.go("/admin/projects/" + projectId);
            console.log(projectId);
          },
          $scope.deleteProject = function(projectId){
            console.log(projectId);
          }
        }
      };
    });
