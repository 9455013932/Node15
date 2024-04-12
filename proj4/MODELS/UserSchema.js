const mongoose =require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
    },
    gender:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

});

module.exports=mongoose.model('user',userSchema)