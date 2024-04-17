const mongoose=require('mongoose');

const Blogschema =new mongoose.Schema({
    Title: { type: String, required: true },
    Des: {type :String ,required:true},
    Rating:{type:String, required:false},
    Author:{type:String, required:false},
    usere:{type:String},
    
   
})

const Blogmodel=mongoose.model('Blogcollection',Blogschema);

module.exports=Blogmodel;