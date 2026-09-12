 const express = require('express')

 const dotEnv = require('dotenv')
 const mongoose = require('mongoose')
 const bodyParser = require('body-parser')
 const employeeRoutes = require('./routes/employeeRoutes')
 const dns = require('dns')// it is for mongodb and in mongodb network change 0.0.0.0 there

 dns.setServers(['1.1.1.1', '8.8.8.8'])

 const port = process.env.port || 5500

 const app = express()

 app.use(bodyParser.json())

 dotEnv.config()

 mongoose.connect(process.env.MONGO_URI)// connecting to mongodb
    .then(()=>{
        console.log('Connected to mongodb')
    })
    .catch((error)=>{
        console.log('Error', error)
    })

    app.use('/employees', employeeRoutes )// creating a middleware

 
 app.listen(port, console.log('Server connected successfully to port :'+port))