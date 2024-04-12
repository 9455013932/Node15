 const exprees= require('express')
 const userRoutes=require('./controllers/userRoutes')
 const app =exprees()
 const PORT=8000;
 const cors=require('cors');
 const bodyParser= require('body-parser');


app.use(bodyParser.json());
const allowedOrigins= ['http://localhost:3000','http://localhost:3001']

app.use(cors({
    origin: function(origin,callback){
        console.log('origin',origin);
        if(!origin) return callback(null,true):
        if(allowedOrigins.includes(origin)) return callback(null,true);
        else{
            return callback(new Error ('Not allowed by CORS')); 
        }
    }
}))
app.use('/userapis',userRoutes);
app.get('/',(req,res)=>{
     res.send("hello world")
 });

app.listen(PORT,()=>{
     console.log(`server is running on port ${PORT}`)
})