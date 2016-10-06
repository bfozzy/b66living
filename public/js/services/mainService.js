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
  });
