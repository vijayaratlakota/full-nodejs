const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        default:false
    },
    city:{
        type:String,
        default:false
    }
})

module.exports = mongoose.model('Employee', employeeSchema)//here we are exporting model & schema