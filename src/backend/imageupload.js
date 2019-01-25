var mongoose = require('mongoose');

//Connect to Mongoose
const conn = mongoose.connect('mongodb://hackgalleryuser:hackgallery1password@ds161804.mlab.com:61804/hackgallery');

//Image Schema
var uploadSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
   image:{
        type: String,
        required: true
    }
});

var Upload = module.exports = mongoose.model('Uploads', uploadSchema);

module.exports.upload = function(data,res)
{
Upload.create(data,(err,user)=>
{
    if(err){
        console.log("Something went wrong please try again.");
        res.send("Something went wrong please try again.");
    }
    console.log("Photo Uploaded successfully.");
    res.send(true);
});

}

module.exports.getimages = function(Email, res){
    console.log(Email);
    Upload.find({email:Email.email})
    .then((doc)=>{
        if(doc.length === 0){
            console.log("No images.");
            res.send("false");
        }else{
            console.log("Images fetched.");
            res.send(doc);
        }
    })
    .catch((err)=>{
        console.log(err+"Something went wrong please try again.");
        res.send("false");
    });
}