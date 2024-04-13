// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;   // Set the port number
const app = express();    // Initialize the app variable with express()
require('./db.js');   // Connect to the database using Mongoose
const User = require('./MODELS/UserSchema.js');   // importing userschema from db,js
const bcrypt = require('bcryptjs');  //iimportig package bcryptjs
const jwt = require('jsonwebtoken');  // importing jwt for token
const cookieParser = require('cookie-parser');   // 

app.use(bodyParser.json());  // Parse JSON request bodies

// Enable CORS for the app
app.use(cors());
function authenticateToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = req.body;

    if (!token) {
        const error = new Error('Token not Found');
        next(error);

    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (id && decoded.id !== id) {
            // return res.status(401).json({message:'Auth Error'})
            const error = new Error('Invalid Token');
            next(error);
        }
        req.id = decoded;
        next();
    }
    catch (err) {
        // console.log(err);
        // res.status(500).json({message:'Invalid Token'});
        next(err);
    }
}
// Define the root route for the app
app.get('/', (req, res) => {
    // Send a response indicating that the API is working
    res.send('API works!!');
});

app.post('/register', async (req, res, next) => {
    try {
        const { name, password, email, age, gender } = req.body;
        const existigUser = await User.findOne({ email });

        if (existigUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);  //taken unique value
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('salt', salt)
        console.log("hashedpassword", hashedPassword);

        const newUser = new User({
            name,
            password: hashedPassword,
            email,
            gender,
            age,
        });
        await newUser.save(); //save the data in database
        res.status(201).json({ message: 'User created successfully' });

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existigUser = await User.findOne({ email });
        if (!existigUser) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existigUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: existigUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: 20
        });

        const refreshToken = jwt.sign({ id: existigUser._id }, process.env.JWT_REFRESH_KEY)
        existigUser.refreshToken = refreshToken;
        await existigUser.save();

        res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/refresh_token' })

        res.status(200).json({
            token,
            refreshToken,
            message: 'User logged in successfully'
        });
    }

    catch (err) {
        res.status(500).json({ message: err.message })
    }

})

app.get('/getmyprofile', authenticateToken, async (req, res) => {
    const { id } = req.body;
    const user = await User.findById(id);
    user.password = undefined;
    res.status(200).json({ user });

})

app.get('/refresh_token', async (req, res, next) => {
    const token =req.cookies.refreshToken;
    if(!token){
        const error= new Error ('token not found');
        next(error);
    }
    // verify the token
    jwt.verify(token, process.env.JWT_REFRESH_KEY, async (err, user) => {
        if(err){
            const error=new Error ('token not found');
            next(error);

        }
        const id =decoded.id;
        const existigUser= await User.findById(id);
        if(!existigUser|| existigUser.refreshToken){
            const error=new Error ('token not found');
            next(error);
        }

        const accesstoken=jwt.sign({id:existigUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:40
        })
        const refreshToken=jwt.sign({id:existigUser._id},process.env.JWT_REFRESH_KEY);
        await existigUser.save();
        res.cookie('refreshToken',refreshToken,{httpOnly:true,path:'/refresh_token'})

        res.status(200).json({
            accesstoken,
            refreshToken,
            message:"Token refreshed successful"
        }); 
    })

    res.send(token)
})
//  ERROR HANDLING MIDDlWARE
app.use((err, req, res, next) => {
    console.log('error middleware called', err);
    res.status(500).json({ message: err.message });
})
// Start the server and listen on the specified port
app.listen(PORT, () => {
    // Log a message indicating that the server is running
    console.log(`Server is running on port ${PORT}`);
});