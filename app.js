/** Import express, body-parser module **/
const express = require("express");
const bodyParser = require("body-parser");
/**  Use express body-parser module **/
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen("3000", ()=>{
    console.log("server is on port 3000");
})
