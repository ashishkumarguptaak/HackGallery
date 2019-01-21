var mongoose = require('mongoose');


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
    var email = userdata.email;
    User.create(userdata,  (err, user) => {
        if(err){
            console.log("Some error occurred while adding user.");
            res.send("Some error occurred while adding user.");
            next();
        }
        res.send("User registered successfully."+email);
    });
}