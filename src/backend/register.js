var mongoose = require('mongoose');
var nodemailer = require('nodemailer');


//Connect to Mongoose
const conn = mongoose.connect('mongodb://bookuser:bookuser1@ds213255.mlab.com:13255/bookgallery');

//Register Schema
var registerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: false
    },
    state:{
        type: String,
        required: false
    },
    education:{
        type: String,
        required: false
    },
    profileimage:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date()
    },
    verified:{
        type: Boolean,
        default: false
    }
});

var User = module.exports = mongoose.model('bookgalleryusers', registerSchema);

//Add Contact Emails
module.exports.registerUser = function(userdata, res){
    var Email = userdata.email;
    console.log(Email);

    User.find({email:Email})
    .then((doc)=>{
        if(doc.length === 0){
            User.create(userdata,  (err, user) => {
                if(err){
                    console.log("Something went wrong please try again."+err);
                    res.send("Creation error Something went wrong please try again.");
                }else{
                    console.log("User registered successfully.");
                    res.send(true);
                }
            });
        }else if(doc[0].verified) {
            console.log("Email is already registered.");
            res.send("Email is already registered.");
        }else {
            console.log("User registered successfully.");
            res.send(true)
        }
    })
   .catch((err)=>{
       console.log(err+"Something went wrong please try again.");
       res.send("Error Something went wrong please try again.");
   });
}

var transporter = nodemailer.createTransport(
    {
        service:'gmail',
        secure:false,
        port:25,
        auth:{
            user:'testgamilforme@gmail.com',
            pass:'TESTtest@123'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    module.exports.sendOTP = function(otpdata, res){
        var mailOptions={
            from:'testgamilforme@gmail.com',
            to: otpdata.email,
            subject:'Verification OTP',
            text:'Your HackGallery verification OTP is '+otpdata.otp
        };
    
        transporter.sendMail(mailOptions,function(error,info){
        if(error) {
            console.log(error+"Email error");
            res.send("Email error")
        } else {
            console.log('OTP sent successfully.'+info.response);
            res.send("OTP sent successfully.");
        }
    
    });
    }

    module.exports.verifyOTP = function (emaildata, res){
        console.log(emaildata.email)
        Email = emaildata.email;
        User.findOneAndUpdate({email: Email}, {$set:{verified:true}}, {new: true}, (err, docs)=>{
            if(err) {
                res.send("Something went wrong.");
            }else {
                res.send("Verified successfully.");
            }
        });
    }

    module.exports.login = function(logindata, res) {
        Email = logindata.email;
        Password = logindata.password;
        console.log(Email+" "+Password);
        User.find({email:Email})
        .then((doc)=>{
            if(doc.length === 0){
                login = {status: "false", data: "This email is not registered."}
                res.send(login);
            }else if(doc[0].verified){
                if(doc[0].password !== Password){
                    login = {status: "false", data: "Invalid credentials."}
                    res.send(login);
                }else {
                    login = {status: "true", data: doc[0]}
                    res.send(login);
                }
            }else{
                login = {status: "false", data: "Your account is not verified yet please register again."}
                res.send(login);
            }
        })
        .catch((err)=>{
            login = {status: "false", data: "Something went wrong please try again."}
            res.send(login);
        });
    }

    module.exports.updateprofile = function(profiledata, res){
        Email = profiledata.email;
        User.findOneAndUpdate({email: Email}, {$set:profiledata}, {new: true}, (err, docs)=>{
            if(err) {
                res.send("Something went wrong.");
            }else {
                res.send("Updated successfully.");
            }
        });
    }