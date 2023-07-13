const express=require("express")
const { EmpModel } = require("../model/emp.model")

const empRouter=express.Router()

empRouter.post("/employee",async(req,res)=>{
    const payload=req.body
    try{
        let user=new EmpModel(payload)
        await user.save()
        res.status(200).send({msg:"Employee added successfully"})

    }catch(err){
        res.status(400).send(err)
    }
})

empRouter.get("/",async(req,res)=>{
    try{
        let user=await EmpModel.find()
        res.status(200).send(user)

    }catch(err){
        res.status(400).send(err)

    }
})

empRouter.patch("/update/:id",async(req,res)=>{
    let {id}=req.params
    let payload=req.body
    try{
        await EmpModel.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({msg:"Employee update successfully"})

    }catch(err){
        res.status(400).send(err)
    }

})
empRouter.delete("/delete/:id",async(req,res)=>{
    let {id}=req.params
    try{
        await EmpModel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"Employee delete successfully"})

    }catch(err){
        res.status(400).send(err)
    }

})

module.exports={empRouter}