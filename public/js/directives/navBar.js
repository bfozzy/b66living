angular.module("b66Living")
  .directive("navBar", function(){
      return {

        templateUrl: "./templates/directiveTemplates/navBar.html",

        restrict: "AE",
        link: function(scope, element, attributes){

          if (scope.projectState){
            console.log("if statement works");
            scope.navProjectName = scope.projectName;
          }
          else {
            scope.navProjectName = 'Project Button';
          }
        },
        controller: function($scope, mainService, $stateParams){
           mainService.getProject($stateParams.id).then(function(res){
            // console.log(res.data[0].project_name);

            $scope.projectName = res.data[0].project_name;
          });
          $scope.projectState = $stateParams.id;






        }
      };
    });
