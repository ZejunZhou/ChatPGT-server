/** Import express, body-parser module **/
const express = require("express");
const bodyParser = require("body-parser");
/**  Use express body-parser module **/
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
/**use static file */
app.use(express.static('public'));

app.listen("3000", ()=>{
    console.log("server is on port 3000");
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})
