const express = require("express"),
      app = express(),
      bodyparser = require("body-parser"),
      ObjectId = require("mongodb").ObjectID,
      port = 3000,
      route = require("./route/pilotRoute"),
      MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://grupo-mobile:UgRKE9McIIiT8YbE@cluster0.nwdmj.gcp.mongodb.net/dbMobile?retryWrites=true&w=majority";

const client = new MongoClient(uri, {useUnifiedTopology: true});

client.connect().then((client)=>{
    db = client.db("test"); 
    var cursor = db.collection("data").find();
    console.log("mongodb connected successfully....");
}).catch(err => console.log(err));

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/", route);
app.set("views", "./views");
app.set("view engine", "ejs")

app.listen(port, () => console.log("Server running on port " +port));
