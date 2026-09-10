 const express = require('express')

 const port = 5500

 const app = express()

 app.get('/apple', (req,res)=>{
    res.send('Hey welcome top my website , apples are red in color ')
 })


 app.listen(port, console.log('Server connected successfully to port :'+port))