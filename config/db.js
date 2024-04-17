const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1/admin').then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.error(err);
})



module.exports=mongoose;