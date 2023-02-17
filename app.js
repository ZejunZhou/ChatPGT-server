/** Import express, body-parser module **/
const express = require("express");
const bodyParser = require("body-parser");
/**  Use express body-parser module **/
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
/**use static file */
app.use(express.static('public'));

const https = require("https");

app.listen("3000", ()=>{
    console.log("server is on port 3000");
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) =>{
    var first_name = req.body.fname;
    var last_name = req.body.lname;
    var email = req.body.email;
    var data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME:first_name,
                LNAME:last_name
            }
        }]
    }
    var jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/f0b5823966";
    const options = {
        method:"POST",
        auth: "zejun:5067d75721e24de2ce2f144705c0c5eb-us9"
    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            //console.log(JSON.parse(data));
            if(response.statusCode == 200){
                console.log(response.statusCode);
                console.log(__dirname + "/success.html");
                res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");
            }
        })
    })
    request.write(jsonData);
    request.end();

})
