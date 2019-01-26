const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');
const http = require('http');
const app= express();

const DIR = './uploads';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

Email = require('./src/backend/contactemails');
Register = require('./src/backend/register');
Upload = require('./src/backend/imageupload');
FileUpload = require('./src/backend/fileupload');


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

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


//Upload pdf
app.post('/uploadfile',upload.single('pdfname'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
});


//Set port
const port = process.env.PORT || '1818';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
