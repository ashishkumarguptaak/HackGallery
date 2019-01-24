const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app= express();

app.use(cors());

Email = require('./src/backend/contactemails');
Register = require('./src/backend/register');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//Add Contact Email
app.post('/addcontactemail', function(req, res, next){
    var emaildata = req.body;
    Email.addContactEmail(emaildata, res);
});

//Register User 
app.post('/registeruser', function(req, res, next){
    var userdata = req.body;
    Register.registerUser(userdata, res);
});

app.post('/otp', function(req, res, next){
    var otpdata = req.body;
    Register.sendOTP(otpdata, res);
});

app.post('/verify', function(req, res, next){
    var emaildata = req.body;
    Register.verifyOTP(emaildata, res);
});

app.post('/login', function(req, res, next){
    var logindata = req.body;
    Register.login(logindata, res);
});

app.post('/profile', function(req, res, next){
    var profiledata = req.body;
    Register.getprofile(profiledata, res);
})


//Set port
const port = process.env.PORT || '1818';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
