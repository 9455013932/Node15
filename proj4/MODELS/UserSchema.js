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
    DOB:{
        type:String,
    },
    gender:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken:{
        type:String,

    },
    profilePicture:{
        
    },
    contactInfo: {
        type: Number,
        
        unique: true
    },

});

module.exports=mongoose.model('user',userSchema)