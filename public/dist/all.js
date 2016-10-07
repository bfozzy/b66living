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
        url: "/admin/projects/new"
      })
      .state("addCustomer", {
        templateUrl: "templates/routeTemplates/addCustomerView.html",
        url: "/admin/projects/:id/customer/new"
      })
      .state("seeProject", {
        templateUrl: "templates/routeTemplates/projectDetail.html",
        url: "/admin/projects/:id"
      });
  });

angular.module("b66Living")
  .controller("testCtrl", function($scope, $state){
    $scope.go = function(){
      $state.go('projects')
    }
  })

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
            //still need to call the function in the service dropping in the customer object and the id variable.
          };

        }
      };
    });

angular.module("b66Living")
  .directive("addProjectDirective", function(){
      return {

        templateUrl: "./templates/directiveTemplates/addProject.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService){
          //controller is working
          $scope.newproj = function(projectName, ProjectStartDate, ProjectDeadline){
            //projData will turn the form in to an object that can be passed to the service
            var projData = {
              projectName: projectName,
              ProjectStartDate: ProjectStartDate,
              ProjectDeadline: ProjectDeadline
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
  .directive("project", function(){
      return {

        templateUrl: "./templates/directiveTemplates/project.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $stateParams){
          $scope.getProject = mainService.getProject($stateParams.id).then(function(res){
            console.log(res.data);
            $scope.project = res.data;
          });
          $scope.getInvoices = mainService.getInvoices($stateParams.id).then(function(res){
            console.log(res.data);
            $scope.invoices = res.data;
          });

        }
      };
    });

angular.module("b66Living")
  .directive("projectSummaries", function(){
      return {

        templateUrl: "./templates/directiveTemplates/projectSummaries.html",

        restrict: "AE",
        link: function(scope, element, attributes){

        },
        controller: function($scope, mainService, $state){

          $scope.getProjects = function(){
            mainService.showProjects()
            .then(function(res){
              console.log(res.data);
              $scope.projects = res.data;
            });
          }(),

          $scope.deleteProject = function(projectId){
            console.log(projectId);//this should go in the project directive
          }
        }
      };
    });

angular.module("b66Living")
  .service("mainService", function($http){
    this.serviceTest = "Service Is Working!";

    this.createProj = function(data){
      return $http.post("admin/project/new", data);
    };
    this.createCust = function(customer, id){
      return $http.post("admin/project/" + id + "customer/new", customer);
    };
    this.showProjects = function(){
    return $http.get("admin/projects");
  };
    this.getProject = function(id){
      return $http.get("admin/project/"+id);
    }
    this.getInvoices = function(id){
      return $http.get("admin/project/"+id+"/invoices")
    }
  });
