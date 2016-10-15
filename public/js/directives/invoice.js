angular.module("b66Living")
  .directive("invoice", function(){
      return {

        templateUrl: "./templates/directiveTemplates/invoice.html",

        restrict: "AE",
        link: function(scope, element, attributes){


        },
        controller: function($scope, mainService, $stateParams){
          mainService.getProducts($stateParams.id, $stateParams.invoiceId).then(function(res){
          $scope.products = res.data;
          console.log(res.data);
          });
        var productIndex = function(){
          var productLength = res.data.length;
          for (var i = 0; i < productLength; i++){
            var subtot = 0;
            // subtot += Number(res.data[i])
            // console.log(i);
            $scope.index = i+1;
            $scope.productSubtotal = subtot;

          }
        };
        productIndex();
          // console.log($stateParams);
        $scope.addProduct = function(){
          mainService.addProduct($stateParams.invoiceId).then(function(res){//Still need to create the service, server.js and ctrl sides of the function
            if (res === 200){
              swal("Product Added!");
            }
          });
        };






        }
      };
    });
