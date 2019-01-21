var mongoose = require('mongoose');

//Email Schema
var emailSchema = mongoose.Schema({
    sender:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

var Email = module.exports = mongoose.model('contactemails', emailSchema);

//Add Contact Emails
module.exports.addContactEmail = function(emaildata, res){
    Email.create(emaildata, (err, email) => {
        if(err){
            console.log("Some error occurred while adding contact email.");
            res.send("Some error occurred while sending mail");
            next();
        }
        res.send("Contact Email send");
    });
}