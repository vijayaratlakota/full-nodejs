const Employee = require('../models/Employee')

const createEmployee = async(req,res) =>{
    try{
        const {name, email , phone, city} = req.body // we are taking the req send by user and storing in req.body 

        const employee = new Employee({// creating an employee object and stiring all these in new variable
            name,
            email,
            phone,
            city
        })
        await employee.save()
        res.status(201).json(employee)
    }catch(error){
        console.log('Something went wrong there is an error:', error)
        res.status(500).json({message: 'server error'})
    }
}

// it was for getting data of all employees
const getEmployee = async(req,res)=>{
    try{
        const employees = await Employee.find()
        res.status(200).json(employees)
    }catch(error){
        console.log('this is an error', error)
        res.status(500).json({message : "Server error"})
    }

}

// it was getting data for single employee

const singleEmployee = async(req,res)=>{
    try{
        const employee = await Employee.findById(req.params.id)
        if(!employee){
            res.status(500).json({message:"Employee not found"})
        }
        res.status(200).json(employee)
    }catch(error){
        console.log('Something went wrong', error)
        res.status(500).json({message:'server error'})
    }

}

const updateEmployee = async(req,res)=>{
    
    try{
        const {name, email, phone, city} = req.body
        const myEmployee = await Employee.findByIdAndUpdate(req.params.id,
            { name, email, phone, city}
        )
        if(!myEmployee){
            res.status(404).json({message:"user not found"})
        }
        res.status(200).json(myEmployee)
    }catch(error){
        console.log('it is an error :', error)
        res.status(500).json({message:"server error"})
    }
}

const deleteEmployee = async(req,res)=>{
    try{
        const deleteEmployee = await Employee.findByIdAndDelete(req.params.id)
        res.status(204).send()
    }catch(error){
        console.log('it is an error:', error)
        res.status(500).json({message:'server error'})
    }
    

}
module.exports = { createEmployee , getEmployee, singleEmployee, updateEmployee , deleteEmployee}