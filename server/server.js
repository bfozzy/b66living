var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var massive = require("massive");
var connectionString = "postgres://postgres:@localhost/b66living";
var app = module.exports = express();
var massiveInstance = massive.connectSync({connectionString : connectionString});

app.set("db", massiveInstance);
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../public"));

var projectCtrl = require("./nodeControllers/projectCtrl.js");
//
// app.get("/api/animals", animalCtrl.getAllAnimals)
app.post("/admin/project/new", projectCtrl.createNewProject);
app.post("/admin/customer/new", projectCtrl.createNewCustomer);

app.get("/admin/projects", projectCtrl.getProjects);
app.get("/admin/project/:id", projectCtrl.getProject);

var port = 8001;

app.listen(port, function(){
  console.log("listening to 8001");
});
