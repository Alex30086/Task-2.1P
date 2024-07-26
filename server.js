const express = require('express')
const bodyParser = require("body-parser")
const app = express()

const api_key = 'e6b374b555be3d9624cc8ab66378bb1d-0f1db83d-8f04dbf4';
const domain = 'sandbox04ad7b6b26a84cc5b05c71ae3515281c.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/',(req, res) => {
    const email = req.body.email;
    const data = {
        from: 'Alex <w1552712371@gmail.com>',
        to: email,
        subject: 'Welcome',
        text: 'Welcome to Deakin'
    };

    mailgun.messages().send(data, function (error, body) {
        if(error){
            console.log(error);
        }else{
            console.log(body);
            res.send("You haave been subscribe successfully")
        }
    });
});

app.listen(2024,() => {
    console.log("Server is running on port 2024")
});