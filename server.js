// dependencies 
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 1004;


// parse data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// assets & paths 
app.use(express.static('public'));
app.get("/api/notes", function(req,res) {
    res.sendFile(_dirname, "/public/index.html")
});
app.get("/api/notes", function (req,res) {
    res.sendFile(_dirname + "/db/db.json")

});

// creating new notes
