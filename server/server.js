var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var massive = require("massive");
var connectionString = "postgres://postgres:@localhost/b66living";
var app = module.exports = express();
var massiveInstance = massive.connectSync({connectionString : connectionString});
var serverConfig = require("./server_config.js");

app.set("db", massiveInstance);
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../public"));

//Controllers!
var projectCtrl = require("./nodeControllers/projectCtrl.js");

// POST Endpoints!
app.post("/admin/project/new", projectCtrl.createNewProject);
app.post("/admin/project/:id/customer/new", projectCtrl.createNewCustomer);
app.post("/admin/project/:id/invoice/new", projectCtrl.createNewInvoice);
//GET Endpoints!
app.get("/admin/projects", projectCtrl.getProjects);
app.get("/admin/project/:id", projectCtrl.getProject);
app.get("/admin/project/:id/invoices", projectCtrl.getInvoices);
app.get("/admin/project/:id/customers", projectCtrl.getCustomers);


var port = serverConfig.serverPort;

app.listen(port, function(){
  console.log("listening to 8001");
});
