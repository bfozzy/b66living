angular.module("b66Living")
  .service("mainService", function($http){
    this.serviceTest = "Service Is Working!";

    this.createProj = function(data){
      return $http.post("admin/project/new", data)
    }
    this.showProjects = function(){
    return $http.get("admin/projects")
    }
  })
