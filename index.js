 const express = require('express')

 const dotEnv = require('dotenv')
 const mongoose = require('mongoose')
 const bodyParser = require('body-parser')
 const employeeRoutes = require('./routes/employeeRoutes')
 const dns = require('dns')// it is for mongodb and in mongodb network change 0.0.0.0 there
 const session = require('express-session')
 const MongoDBStore = require('connect-mongodb-session')(session);
 const User = require('./models/User')
 const bcrypt = require('bcryptjs')


 dns.setServers(['1.1.1.1', '8.8.8.8'])

 

 const port = process.env.port || 5500

 const app = express()
 app.use(express.static('public'))
 
 app.use(bodyParser.json())
 app.use(express.urlencoded({extended:true}))// getting form data entered by user using this middleware

 app.set('view engine', 'ejs')

 dotEnv.config()

 const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "mySession",
 })

 app.use(session({
    secret: 'This is secret',
    resave: false,
    saveUninitialized: false,
    store: store
 }))

 const userAuth = (req,res,next)=>{
   if(req.session.isAuth){
      next()
   }else{
      res.redirect('/signup')
   }
 }

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

 app.get('/signup', (req,res)=>{
    res.render('register')
 })

 app.get('/dashboard',userAuth,(req,res)=>{
    res.render('welcome')
 })

 app.post('/register', async (req,res)=>{
   const {username, email, password} = req.body
   let user = await User.findOne({email})
   if(user){
      return res.redirect('/signup')
   }
   const hashedPassword = await bcrypt.hash(password, 12)

   user = new User({
      username,
      email,
      password : hashedPassword
   })
   await user.save()
   req.session.person = user.username
   res.redirect('/login')
 })

 app.post('/user-login', async (req,res)=>{
   const {email, password} = req.body
   
   const user = await User.findOne({email})

   if(!user){
      return res.redirect('/signup')
   }
   const checkPassword = await bcrypt.compare(password, user.password)

   if(!checkPassword){
      return res.redirect('/signup')
   }
   req.session.isAuth = true
   res.redirect('/dashboard')

 })

 app.post('/logout', (req,res)=>{
   req.session.destroy((error)=>{
      if(error) throw error
      res.redirect('/signup')
   })
 })

 

 mongoose.connect(process.env.MONGO_URI)// connecting to mongodb
    .then(()=>{
        console.log('Connected to mongodb')
    })
    .catch((error)=>{
        console.log('Error', error)
    })

   app.use('/employees', employeeRoutes )// creating a middleware

 
 app.listen(port, console.log('Server connected successfully to port :'+port))