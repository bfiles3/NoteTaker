// dependencies 
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 1004;
app.listen(PORT);

//variable for arrays
const notes = [];
const ids = [];

// parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// assets & paths 
app.use(express.static('public'));
app.get("*", function (req, res) {
    res.sendFile(_dirname, "/public/index.html")
});
app.get("/notes", function (req, res) {
    res.sendFile(_dirname + "/public/notes.html")
});
app.get("/api/notes", function (req, res) {
    res.sendFile(_dirname + "/db/db.json")
});

// creating new notes
app.post("api/notes", function (req, res) {
    fs.readFile(_dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            notes = JSON.parse(data);
            notes.forEach(note => ids.push(note.id));
            if (ids.length === 0) {
                req.body.id = 1;
            } else {
                // create note variable to encompass the new note being added to the array
                let newNote = ids[ids.length - 1] + 1;
                req.body.id = newNote;
            }
            notes.push(newNote);

            fs.writeFile(_dirname + "/db/db.json", "utf8", JSON.stringify(notes), function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.sendFile(_dirname + "/db/db.json");
                    console.log("Note added!");
                }

            }
            )
        };

    });
});

// deleting notes
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(_dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            let notes = JSON.parse(data).filter(note => {
                if (note.id != req.params.id) {
                    return notes
                }
            });
            fs.writeFile(_dirname + "/db/db.json", JSON.stringify(notes), function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    res.sendFile(_dirname + "/db/db.json");
                    console.log("Note deleted!");
                }
            });
        }
    });
});
app.listen(PORT, function () {
    console.log("Server is listening on: http://localhost:" + PORT);
});