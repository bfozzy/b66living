angular.module("b66Living")
  .service("mainService", function($http){
    this.serviceTest = "Service Is Working!"
    this.createProj = function(data){

    $http.post("admin/project/new", data).then(function(response){
      
    })
  }
  })
