angular.module("b66Living")
  .directive("navBar", function(){
      return {

        templateUrl: "./templates/directiveTemplates/navBar.html",

        restrict: "AE",
        link: function(scope, element, attributes){


        },
        controller: function($scope, mainService, $stateParams, $state){
          $scope.projectState = $stateParams.id;
          console.log($state);
             if ($scope.projectState){
               mainService.getProject($stateParams.id).then(function(res){

              //  console.log("if statement works");
               $scope.navProjectName = "< Back";
             });

             }
             else {
               $scope.navProjectName = 'Projects';
             }
            // console.log(res.data[0].project_name);






        }
      };
    });
