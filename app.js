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
        auth: "zejun:99da2945c7d1c9cc72f55bd0815f6c5d-us9"
    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            //console.log(JSON.parse(data));
            if(response.statusCode == 200){
                console.log("success");
            }
        })
    })




    request.write(jsonData);
    request.end();



    //console.log(first_name, last_name, email);
})

//List ID
//f0b5823966

//API key
// 99da2945c7d1c9cc72f55bd0815f6c5d-us9
