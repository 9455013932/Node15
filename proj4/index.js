// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set the port number
const PORT = 8000;

// Initialize the app variable with express()
const app = express();

// Connect to the database using Mongoose
require('./db.js');

// importing userschema from db,js
const User =require('./MODELS/UserSchema.js');

//iimportig package bcryptjs
const bcrypt=require('bcryptjs');
// importing jwt for token
const jwt=require('jsonwebtoken');
// Parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for the app
app.use(cors());
function authenticateToken(req,res,next){
    const token=req.header('Authorization');
    const {id}=req.body;

    if (!token) return res.status(401).json({message:'Auth Erroe'});

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        id=decoded.id;
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Invalid Token'});
    }
}
// Define the root route for the app
app.get('/', (req, res) => {
    // Send a response indicating that the API is working
    res.send('API works!!');
});

app.post('/register',async (req,res)=>{
    try{
        const{name,password,email,age,gender}=req.body;
        const existigUser=await User.findOne({email});
    
    if(existigUser){
        return res.status(409).json({message:'Email already exists'});
    }
    const salt=await bcrypt.genSalt(10);  //taken unique value
    const hashedPassword=await bcrypt.hash(password,salt);
    console.log('salt',salt)
    console.log("hashedpassword",hashedPassword);

    const newUser=new User({
        name,
        password:hashedPassword,
        email,
        gender,
        age,
    });
    await newUser.save(); //save the data in database
    res.status(201).json({message:'User created successfully'});

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

app.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body;

    const existigUser=await User.findOne({email});
    if(!existigUser){
        return res.status(401).json({message:"Invalid Credentials"});
    }
    const isPasswordCorrect=await bcrypt.compare(password,existigUser.password);
    if(!isPasswordCorrect){
        return res.status(401).json({message:'Invalid credentials'});
    }
    const token=jwt.sign({id:existigUser._id},process.env.JWT_SECRET_KEY,{
        expiresIn:'1h'
    });
    res.status(200).json({
        token,
        message:'User logged in successfully'
    });
    }

    catch(err){
        res.status(500).json    ({message:err.message})
    }
    
})

app.get('/getmyprofile',authenticateToken,async (req,res)=>{
    const{id}=req.body;
    const user=await User.findById(id);
    res.status(200).json({user});

})
// Start the server and listen on the specified port
app.listen(PORT, () => {
    // Log a message indicating that the server is running
    console.log(`Server is running on port ${PORT}`);
});