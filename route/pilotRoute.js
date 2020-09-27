const express = require("express"),
      router = express.Router();

router.get("/", function (req, res) {
  res.render("index.ejs");
});

router.get("/", (req, res) => {
  var cursor = db.collection("data").find();
});

router.post("/show", (req, res) => {
  db.collection("data").save(req.body, (err, result) => {
    if (err) return console.log(err);
    
    console.log("Salvo no Banco de Dados");
    res.redirect("/show");
  });
});

router.get("/show", (req, res) => {
  db.collection("data")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render("show.ejs", { data: results });
    });
});

module.exports=router;