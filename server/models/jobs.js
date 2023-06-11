const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
   _id : {type : String},
   createdBy : {type : String},
   companyName : {type : String},
   logo : {type : String},
   jobPosition : {type : String},
   monthlySalary : {type : Number},
   location : {type : String},
   description : {type : String},
   companyDescription : {type : String},
   skillsRequired : [{type : String}],
   jobType : {type : String},
   jobLocation : {type : String} //remote,office,hybrid

})

module.exports.jobModel = mongoose.model('Jobs',jobSchema);