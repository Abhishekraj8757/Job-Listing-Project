const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : {type : String},
    email : {type : String,required : true},
    password : {type : String,required : true},
    name : {type : String},
    mobileNumber : {type : String}
})

module.exports.userModel = mongoose.model('Users',userSchema);