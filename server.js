// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

// Require Article schema
var Article = require("./models/Article.js");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://heroku_fsj0xkrs:v1ft6a770khn43835e4ka5qmlq@ds149134.mlab.com:49134/heroku_fsj0xkrs", {
  useMongoClient: true
});

var db = mongoose.connection;

// mongoose.connect("mongodb://localhost/nytreact", {
//   useMongoClient: true
// });

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

//You'll need several Express routes for your app:

//  /api/saved (get) - your components will use this to query MongoDB for all saved articles

//  /api/saved (post) - your components will use this to save an article to the database

//  /api/saved (delete) - your components will use this to delete a saved article in the database

// * (get) - will load your single HTML page (with ReactJS) in public/index.html. 
// Make sure you put this after all other GET routes

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered
app.get("/api/saved", function(req, res) {

  // This GET request will search for the latest clickCount
  Article.find({}).exec(function(err, docs) {

    if (err) {
      console.log(err);
    }
    else {
      console.log(docs)
      res.json(docs);
    }
  });
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/api/saved", function(req, res) {
  
  var newArticle = new Article(req.body);

  newArticle.save(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.json(doc);
    }
  });
});


app.delete("/api/:id", function(req, res) {

  Article.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("DELETED!!");
    }
  })

});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});