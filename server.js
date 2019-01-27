const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');
const http = require('http');
const app= express();

const DIR = './uploads';

var pathname = "";
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
        pathname = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      cb(null, pathname); 
    }
});
let upload = multer({storage: storage});

Email = require('./src/backend/contactemails');
Register = require('./src/backend/register');
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

//Upload pdf
app.post('/uploadfile',upload.single('pdfname'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('File received');
        console.log(pathname);
        return res.send({
          success: true
        })
      }
});

//Upload pdf details
app.post('/filedata',(req, res, next)=>{
    data = req.body;
    data.pdf = pathname;
    FileUpload.fileupload(data, res);
});


//Get PDFs
app.post('/getpdf', function(req, res ,next){
    pdfdata = req.body;
    FileUpload.getpdfs(pdfdata, res);
})

//Universal PDFs
app.post('/universalpdf', function(req, res, next){
    FileUpload.universalpdf(res);
})

//Universal Search
app.post('/universalsearch', function(req, res, next){
    var data = req.body;
    FileUpload.universalsearch(data,res);
})

//Forgot Password
app.post('/forgotpassword', function(req, res, next){
    var data = req.body;
    res.send("Sorry");
})
//Set port
const port = process.env.PORT || '1818';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
