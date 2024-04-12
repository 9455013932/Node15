const exprees = require('express');
const router=express.Router();

router.get('/test',(req,res)=>res.send('welcome to the user api'))

module.exports=router;

