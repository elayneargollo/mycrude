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
    console.log("mongodb connected successfully....");
}).catch(err => console.log(err));

app.use(express.static("public"));
app.set("views", "./views");
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/pilot", route);

app.listen(port, () => console.log("Server running on port " +port));

app
  .route("/edit/:id")
  .get((req, res) => {
    var id = req.params.id;

    db.collection("data")
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        res.render("edit.ejs", { data: result });
      });
  })
  .post((req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var surname = req.body.surname;
    var idade = req.body.idade;
    var carro = req.body.carro;
    var peneus = req.body.peneus;
    var radio = req.body.radio;
    db.collection("data").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          surname: surname,
          idade: idade,
          carro: carro,
          peneus: peneus,
          radio: radio,
        },
      },
      (err, result) => {
        if (err) return res.send(err);
        res.redirect("/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  });

app.route("/delete/:id").get((req, res) => {
  var id = req.params.id;

  db.collection("data").deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err);
    console.log("Deletado do Banco de Dados!");
    res.redirect("/show");
  });
});
