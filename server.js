const express = require('express');
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const http = require('http');
const app= express();

app.use(cors());

Email = require('./src/backend/contactemails');
Register = require('./src/backend/register');
Upload = require('./src/backend/imageupload');

app.use(bodyparser.json({limit:'50mb',extended:true}));
app.use(bodyparser.urlencoded({limit:'50mb',extended:true}));
app.use(methodOverride('_method'));

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

//Send OTP
app.post('/otp', function(req, res, next){
    var otpdata = req.body;
    Register.sendOTP(otpdata, res);
});

//Verify user
app.post('/verify', function(req, res, next){
    var emaildata = req.body;
    Register.verifyOTP(emaildata, res);
});

//User login
app.post('/login', function(req, res, next){
    var logindata = req.body;
    Register.login(logindata, res);
});

//Profile update
app.post('/update', function(req, res, next){
    var profiledata = req.body;
    Register.updateprofile(profiledata, res);
});

//Image upload
app.post('/upload',(req,res,next)=>{
    var data = req.body;
    Upload.upload(data,res);
});

//Get images
app.post('/getimages',(req,res,next)=>{
    var Email = req.body;
    Upload.getimages(Email,res);
});


//Set port
const port = process.env.PORT || '1818';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
