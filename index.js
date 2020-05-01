const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const app=express()
const connectdb=require('./db/db');
var reguser=require('./routes/auth')
var loguser=require('./routes/login')
require('./routes/event')
const PORT=process.env.PORT || 5000;

connectdb();

app.use(cors())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json({ extended: false }));
app.use(cookieParser());


app.use('/auth',reguser); //login
app.use('/register',loguser);//signup
app.use('/event',require('./routes/event'));
app.get('/', (req, res) => {
    res.json({"success":"Hey"}) //test route
    
});
app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})