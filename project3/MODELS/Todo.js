const mongoose = require('mongoose');
const todoschema=new mongoose.Schema({
    task :{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false

    }

})
// exporting the model
const Todo=mongoose.model('Todo',todoschema);

module.exports=Todo;


// defing rsandoom user schema
// name:{
//     type:String,
//     required:true
// },
// age:{
//     type:Number,
//     min:18,
//     max:65

// },
// email:{
//     type:String,
//     required:true,
//     unique:true,
//     match:/^\S+@\S+\.\S+$/

// },
// password:{
//     type:String,
//     required:true
// },
// date{
//     type:Date,
//     default:Date.now
// // }





// const mongoose=require('mongoose')
// require('dotenv').config();
// mongoose.connect(process.env.MOONGO_URL).then(()=>{
//     console.log("connected to mongodb");

// })
// .catch((err)=>{
//     console.log('Error connecting to databse'+err);
// })