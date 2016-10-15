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
          };// End of productIndex

          productIndex();
          // console.log($stateParams);
          $scope.addProduct = function(productDescription, productWholesale,productRetail,productTax){
          var newProduct = {
            description: productDescription,
            wholesale: productWholesale,
            retail: productRetail,
            tax: productTax
          };
          mainService.addProduct($stateParams.invoiceId, newProduct).then(function(res){
              if (res === 200){
                swal("Product Added!");
              }
            });
          };//End of addProduct
        }//End of Controller
      };//End of directive return statement
    });//End of directive
