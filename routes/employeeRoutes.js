const express = require('express')
const router = express.Router()
const employeeController = require('../Controllers/Employeecontroller')
const Employee = require('../models/Employee')

router.post('/add-emp', employeeController.createEmployee)// creating a route and it run createEmployee function which is a controller 
router.get('/allemployees', employeeController.getEmployee)// created a route that will call getemployee function in controllers
router.get('/employee/:id', employeeController.singleEmployee)//created a route that will call singleemployee function in controllers



module.exports = router