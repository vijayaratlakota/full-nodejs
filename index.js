 const express = require('express')

 const dotEnv = require('dotenv')
 const mongoose = require('mongoose')
 const bodyParser = require('body-parser')
 const employeeRoutes = require('./routes/employeeRoutes')
 const dns = require('dns')// it is for mongodb and in mongodb network change 0.0.0.0 there
 const session = require('express-session')
 const MongoDBStore = require('connect-mongodb-session')(session);
 const User = require('./models/User')

 dns.setServers(['1.1.1.1', '8.8.8.8'])
 app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
 }))

 const port = process.env.port || 5500

 const app = express()
 app.use(express.static('public'))
 
 app.use(bodyParser.json())

 app.use('view Engine', 'ejs')

 dotEnv.config()

 //client side rendering

 app.get('/mango', (req,res) => {
    res.json({message:'mango'})
 })

 // server side rendering

 app.get('/apple', (req,res) =>{
    res.render('samplePage')
 })

 //-------------------------------------------

 app.get('/login', (req,res)=>{
    res.render('login')
 })

 app.get('/register', (req,res)=>{
    res.render('register')
 })

 app.get('/dashboard',(req,res)=>{
    res.render('welcome')
 })

 mongoose.connect(process.env.MONGO_URI)// connecting to mongodb
    .then(()=>{
        console.log('Connected to mongodb')
    })
    .catch((error)=>{
        console.log('Error', error)
    })

    const store = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection:"mySession"
    })

    app.use('/employees', employeeRoutes )// creating a middleware

 
 app.listen(port, console.log('Server connected successfully to port :'+port))