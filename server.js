// dependencies 
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 1004;


// parse data
app.use(express.urlencoded({extended: true}));
app.use(express.json());