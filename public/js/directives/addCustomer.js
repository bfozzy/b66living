angular.module("b66Living")
  .directive("addCustomer", function(){
      return {

        templateUrl: "./templates/directiveTemplates/addCustomer.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $stateParams){

          $scope.newCust = function(customerName, customerEmail, customerPhone, customerAddressLine1, customerAddressLine2, customerAddressCity, customerAddressState, customerAddressZip){
            var customer = {
              customerData: {
                name: customerName,
                email: customerEmail,
                phone: customerPhone
              },
              custAddress: {
                addressLine1: customerAddressLine1,
                addressLine2: customerAddressLine2,
                addressCity: customerAddressCity,
                addressState: customerAddressState,
                addressZip: customerAddressZip
              }
            };
            console.log($stateParams.id);
            mainService.createCust(customer, $stateParams.id);
          };

        }
      };
    });
