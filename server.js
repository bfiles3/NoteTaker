// dependencies 
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 1004;

//variable for arrays
const notes = [];
const ids = [];

// parse data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// assets & paths 
app.use(express.static('public'));
app.get("/api/notes", function(req,res) {
    res.sendFile(_dirname, "/public/index.html")
});
app.get("/api/notes", function (req,res) {
    res.sendFile(_dirname + "/db/db.json", "utf8", function (err, data){
        if (err){
            console.log(err);
        }
        else {
            notes = JSON.parsa(data);
        }

        req.body.id 
    })

});

// creating new notes
app.post("api/notes", function (req,res){
    fs.readFile(_dirname + "/db/db.json")
}