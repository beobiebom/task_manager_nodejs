const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

//Create user
router.post('/users', async (req, res) => {
    //Create new user from json in client side
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(error) {
        res.status(400).send(error)
    }
//     user.save().then(() => {
//         res.status(201).send(user)         
//     }).catch((error) => {
//         res.status(400).send(e)
//     })
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password) 
        const token = await user.generateAuthToken() 

        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send("Invalid update!")
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true,
        // })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e)
    }
})

//Get information of authenticated user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//Get users
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)    
    } catch (error) {
        res.status(500).send(error) 
    }
})
  
//Get user by ID
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    //MongoDB was able to find everything asked and get it back even if it was nothing
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router