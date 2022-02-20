var bodyParser = require('body-parser');
var cors = require('cors');
const express = require('express');
const app = express();


// intialize all the dependencies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


// import and initialize the service 
var AddServices = require('./src/services').AddServices;
new AddServices(app);


app.get("/test",(req,res)=>{
        res.send("hello")
})

const PORT =8080;
app.listen(PORT,()=>{
        console.log("Server is running on port", PORT);
})
