angular.module("b66Living")
  .directive("addCustomer", function(){
      return {

        templateUrl: "./templates/directiveTemplates/addCustomer.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $stateParams, $state){

          $scope.newCust = function(customerName, customerEmail, customerPhone, customerAddressLine1, customerAddressLine2, customerAddressCity, customerAddressState, customerAddressZip){
            var customer = {
                name: customerName,
                email: customerEmail,
                phone: customerPhone
              };

              var address = {
                addressLine1: customerAddressLine1,
                addressLine2: customerAddressLine2,
                addressCity: customerAddressCity,
                addressState: customerAddressState,
                addressZip: customerAddressZip
              };

            console.log($stateParams.id);
            mainService.createCust(customer, $stateParams.id).then(function(res){
              if(res.status === 200){
                alert("Customer Added")
                $state.reload();
              }
              else {
                alert("There was a problem processing your request")
              }
            })

          };

        }
      };
    });
