const mongoose=require('mongoose');

const typeschema=new mongoose.Schema({
    type:{
        type:String,
        require:true
    }   
})

const typemodel=mongoose.model('typecollection',typeschema);

module.exports=typemodel;