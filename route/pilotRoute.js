const express = require("express"),
  app = express(),
  ObjectId = require('mongodb').ObjectID;

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.post("/show", (req, res) => {
  db.collection("data").insertOne(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log("Salvo no Banco de Dados");
    res.redirect("/show");
  });
});

app.get("/show", (req, res) => {
  db.collection("data")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render("show.ejs", { data: results });
    });
});

app.route("/delete/:id").get((req, res) => {
  var id = req.params.id;

  db.collection("data").deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err);
    console.log("Deletado do Banco de Dados!");
    res.redirect("/show");
  });
});

app.route("/edit/:id").get((req, res) => {
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

module.exports = app;