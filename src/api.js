const express=require('express');

const app=express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//const router=express.Router();
const route=require("./routers/route");
app.use('/',route);


module.exports=app;

