const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB Connection Successfull");
}).catch((err)=>{
    console.log('error conning to database'+err);
});