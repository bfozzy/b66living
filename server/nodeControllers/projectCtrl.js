var app = require("../server.js");
var db = app.get("db");

module.exports = {
  createNewProject: function(req, res){
    db.create_new_project([req.body.name, req.body.startDate, req.body.deadline], function(err){
      if(err){
        res.status(400).json(err);
      }
      else {
        res.status(200).json("Project Added");
      }
    });
  },
  createNewCustomer: function(req, res){
    // db.create_new_project([req.body.name, req.body.startDate, req.body.deadline], function(err){
    //   if(err){
    //     res.status(400).json(err)
    //   }
    //   else {
    //     res.status(200).json("Project Added")
    //   }
    // })
    console.log(req.body);
  },
  getProjects: function(req, res){
    db.get_projects(function(err, projects){
      if(err){
        res.status(400).json(err);
      }
      else {
        res.status(200).json(projects);
      }
    });
  },
  getProject: function(req,res) {
    db.get_project([req.params.id], function(err, project){
      // if(err){
      //   res.status(400).json(err);
      // }
      // else{
      //   res.status(200).json(project);
      // }
      console.log(project);
    });
  }






};
