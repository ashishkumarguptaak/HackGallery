var mongoose = require('mongoose');

var URL = 'mongodb://bookuser:bookuser1@ds213255.mlab.com:13255/bookgallery';
//Connect to Mongoose
const conn = mongoose.connect(URL);

//Image Schema
var uploadSchema = mongoose.Schema({
    name:{
        type:String,
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
        type: Object,
        required: true
    }
});

var FileUpload = module.exports = mongoose.model('FileUploads', uploadSchema);

module.exports.fileupload = function(filedata, res){
    console.log(filedata);
    FileUpload.create(filedata,(err,user)=>
    {
        if(err){
            console.log("Something went wrong please try again.");
            res.send("Something went wrong please try again.");
        }
        console.log("File Uploaded successfully.");
        res.send(true);
    });
}