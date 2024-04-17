const mongoose=require('mongoose');

const adminschema=new mongoose.Schema({
    image:{
        type:String,
        require:true
    },
        name:{
            type:String,
            required:false
        },
        username:{
            type:String,
            require:true,
            unique:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        Phone:{
            type:String,
            require:false
        },
        password:{
            type:String,
            require:true,
        },
        Profession:{
            type:String,
            require:true,
        },
        bio:{
            type:String,
            required:false,
        }

})

const adminmodel=mongoose.model('admincollection',adminschema);

module.exports=adminmodel;