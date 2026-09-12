 const express = require('express')
 const { MongoClient } = require('mongodb')
 const dotEnv = require('dotenv')

 const port = 5500

 const app = express()

 dotEnv.config()

 MongoClient.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to mongodb')
    })
    .catch((error)=>{
        console.log('Error', error)
    })

 const oneMiddle = ((req,res,next)=>{
    if(10<20){
        next()
    }
 })

 const twoMiddle = ((req,res,next)=>{
    if(10<20){
        next()
    }
 })

 const threeMiddle = ((req,res,next)=>{
    if(10<20){
        next()
    }
 })

 app.get('/home',oneMiddle, (req,res)=>{
    res.send('Welcome to Homepage')
 })

 app.get('/about',twoMiddle,(req,res)=>{
    res.send('Welcome to about page')
 })

 app.get('/user/:123',threeMiddle, (req,res)=>{
    res.send('Hey 123, Welocme to our website')
 })


 app.listen(port, console.log('Server connected successfully to port :'+port))