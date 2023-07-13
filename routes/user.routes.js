const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/user.model")

const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {email,password, confirmpassword}=req.body 
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            if(hash){
                let user=new UserModel({email, password:hash})
                await user.save()
                res.status(200).send({msg:"user register successfull"})
            }else{
                res.status(400).send({msg:"user register failed"})
            }
        });

    }catch(err){
        res.status(400).send(err)

    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    let user=await UserModel.findOne({email})
    try{
        bcrypt.compare(password, user.password, async(err, result)=> {
            if(result){
                var token = jwt.sign({userID:user._id}, 'masai');
                res.status(200).send({msg:"login successfull", token})
            }else{
                res.status(400).send({msg:"login failed"})

            }
            // result == true
        });

    }catch(err){
        res.status(400).send(err)

    }

})

module.exports={userRouter}
