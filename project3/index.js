// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set the port number
const PORT = 3000;

// Initialize the app variable with express()
const app = express();

// Connect to the database using Mongoose
require('./db.js');

// import the todo schema
const Todo = require('./MODELS/Todo.js');

// Parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for the app
app.use(cors());

// Define the root route for the app
app.get('/', (req, res) => {
    // Send a response indicating that the API is working
    res.send('API works!!');
});

app.get('/gettodo',async(req,res)=>{
    const alltodos=await Todo.find();
    res.json(alltodos);
});

app.post('/addtodo',async(req,res)=>{
    const {task,completed} =req.body;
    const todo =new Todo({
        task,completed
    })

    const savedTodo =await todo.save();
    res.json({
        message: 'todo saved successfully',
        savedTodo:savedTodo
    });
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
    // Log a message indicating that the server is running
    console.log(`Server is running on port ${PORT}`);
});