const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const FreelancerSchema = new Schema({
    free_name: { type: String, required:true },
    free_alan: { type: String, required:true },
    free_description: {type: String, required:true},
    free_fiyat: {type: Number, required:true},
    slug:{type:String, unique:true},
    category: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category'
  },
    createdAt:{type:Date, default:Date.now },
  });

  FreelancerSchema.pre("validate",function(next){
    this.slug = slugify(this.free_name, {
      lower:true,
      strict:true,
    })
    next();
  })


  
  const Freelancer = mongoose.model('Freelancer', FreelancerSchema);

  module.exports = Freelancer;