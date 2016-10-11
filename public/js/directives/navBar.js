angular.module("b66Living")
  .directive("navBar", function(){
      return {

        templateUrl: "./templates/directiveTemplates/navBar.html",

        restrict: "AE",
        link: function(scope, element, attributes){


        },
        controller: function($scope, mainService, $stateParams){
          $scope.projectState = $stateParams.id;

             if ($scope.projectState){
               mainService.getProject($stateParams.id).then(function(res){

              //  console.log("if statement works");
               $scope.navProjectName = res.data[0].project_name;
             });
               
             }
             else {
               $scope.navProjectName = 'Project Button';
             }
            // console.log(res.data[0].project_name);






        }
      };
    });