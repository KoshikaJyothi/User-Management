import { Router } from 'express'
import UserModel from '../models/UserModel.js'

const userApp = Router()

// Create user
userApp.post('/user', async (req, res, next) => {
  try {
    let user = new UserModel(req.body)
    let savedUser = await user.save()
    res.status(201).json({ message: "User created", payload: savedUser })
  } catch (err) {
    next(err)
  }
})

// Read all users
userApp.get('/users', async (req, res, next) => {
  try {
    let userList = await UserModel.find()
    res.status(200).json({ message: "Users found", payload: userList })
  } catch (err) {
    next(err)
  }
})

// Read single user
userApp.get('/user/:id', async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ message: "User found", payload: user })
  } catch (err) {
    next(err)
  }
})

// Update user
userApp.put('/user/:id', async (req, res, next) => {
  try {
    let user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ message: "User updated", payload: user })
  } catch (err) {
    next(err)
  }
})

// Delete user
userApp.delete('/user/:id', async (req, res, next) => {
  try {
    let user = await UserModel.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ message: "User deleted" })
  } catch (err) {
    next(err)
  }
})

export default userApp
