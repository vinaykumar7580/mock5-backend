const express=require("express")
const cors=require("cors")
const {connection}=require("./db")
const { userRouter } = require("./routes/user.routes")
const { empRouter } = require("./routes/emp.routes")

const app=express()

app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use("/emp",empRouter)


app.listen(8080,async()=>{
    try{
        await connection
        console.log("mongo connected")

    }catch(err){
        console.log(err)
        console.log("mongo not connected")

    }
    console.log("server is running on port 8080")
})