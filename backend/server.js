import exp from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import userApp from './APIs/UserApi.js'

const app = exp()
const port = 4000

// Middleware
app.use(cors())
app.use(exp.json())

// Mount user routes
app.use('/api', userApp)

async function connectDB() {
  try {
    await connect('mongodb://127.0.0.1:27017/backenddb')
    console.log("DB connection success")

    app.listen(port, () => {
      console.log("Server is listening on port", port)
    })
  } catch (err) {
    console.log("Error in DB connection", err)
  }
}

connectDB()
//error handling middleware
app.use((err,req,res,next)=>{
  if(err.name==="ValidationError"){
    return res.status(400).json({message:"validtion failes"})
  }
  if(err.name==="CastError"){
    return res.status(400).json({message:"Invalid id"})
  }
  if(err.code===11000){
    return res.status(400).json({message:"duplicate key error"})
  }
  res.status(500).json({message:"internal server error"})
})