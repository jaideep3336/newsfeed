const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))





app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")

})

app.post("/",function(request,response){
    var firstName = request.body.fname;
    var lastName = request.body.lname;
    var emailId = request.body.email;

console.log(firstName, lastName, emailId)
const data ={members:[{
    email_address:emailId,
    status:"subscribed",
    merge_fields:{
        FNAME:firstName,
        LNAME:lastName
    }
}]}
const datajson = JSON.stringify(data);
const url = "https://us9.api.mailchimp.com/3.0/lists/d29e7f4de";
const options = {
    method:"POST",
    auth:"jaideep:94486b0ea7e866c7e4e30a169ab4580a-us9"
}
const sender = https.request(url,options,function(statusCheck){
console.log(statusCheck);
    if(statusCheck.statusCode === 200){
        response.sendFile(__dirname +"/success.html")
    }else{
        response.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
    })

    sender.write(datajson);

    sender.end();



})

app.post("/failure", function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("it is in port 3000")
})
// apikey:
// 94486b0ea7e866c7e4e30a169ab4580a-us9
// Id
// d29e7f4ded.
