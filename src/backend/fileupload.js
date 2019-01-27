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
    pdf:{
        type: String,
        required: true
    },
    upvotes:{
        type: Number,
        default: 0
    }
});

var FileUpload = module.exports = mongoose.model('FileUploads', uploadSchema);

module.exports.fileupload = function(filedata, res){
    FileUpload.create(filedata,(err,user)=>
    {
        console.log(filedata);
        if(err){
            console.log("Something went wrong please try again.");
            res.send("false");
        }else {
            console.log("File Uploaded successfully.");
            res.send("true");
        }
    });
}

module.exports.getpdfs = function(data, res){
    Email = data.email;
    FileUpload.find({email:Email})
    .then((doc)=>{
        if(doc.length === 0){
            res.send("false");
        }else{
            console.log(doc);
            res.send(doc);
        }
    })
}

module.exports.universalpdf = function(res){
    FileUpload.find()
    .then((doc)=>{
        if(doc.length === 0){
            res.send("false");
        }else{
            console.log(doc);
            res.send(doc);
        }
    })
}

module.exports.universalsearch = function(data, res){
    var Data = data.Name;
    console.log(Data);
FileUpload.find({name: Data})
    .then((doc)=>{
        if(doc.length === 0){
            res.send("false");
        }else{
            console.log(doc);
            res.send(doc);
        }
    })
}