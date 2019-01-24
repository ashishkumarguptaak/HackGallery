var mongoose = require('mongoose');
var nodemailer = require('nodemailer');


//Connect to Mongoose
const conn = mongoose.connect('mongodb://hackgalleryuser:hackgallery1password@ds161804.mlab.com:61804/hackgallery');

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
        required: true
    },
    state:{
        type: String,
        required: true
    },
    education:{
        type: String,
        required: true
    },
    profileimage:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    verified:{
        type: Boolean,
        default: false
    }
});

var User = module.exports = mongoose.model('hackgalleryusers', registerSchema);

//Add Contact Emails
module.exports.registerUser = function(userdata, res){
    var Email = userdata.email;

    User.find({email:Email})
    .then((doc)=>{
        if(doc.length === 0){
            User.create(userdata,  (err, user) => {
                if(err){
                    console.log("Something went wrong please try again.");
                    res.send("Something went wrong please try again.");
                }
                console.log("User registered successfully.");
                res.send(true);
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
       res.send("Something went wrong please try again.");
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
                res.send("This email is not registered.");
            }else if(doc[0].verified){
                if(doc[0].password !== Password){
                    res.send("Invalid credentials.");
                }else {
                    res.send("true");
                }
            }else{
                res.send("Your account is not verified yet please register again.");
            }
        })
        .catch((err)=>{
            res.send("Something went wrong please try again.");
        });
    }

    module.exports.getprofile = function (profileemail, res){
        console.log(profileemail.email)
        Email = profileemail.email;
        User.find({email:Email})
        .then((doc)=>{
            res.send(doc[0]);
        })
        .catch((err)=>{
            res.send("Something went wrong.");
        });
    }