const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

//Create user
app.post('/users', async (req, res) => {
    //Create new user from json in client side
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send()
    } catch(error) {
        res.status(400).send(error)
    }
//     user.save().then(() => {
//         res.status(201).send(user)         
//     }).catch((error) => {
//         res.status(400).send(e)
//     })
})

//Create task
app.post('/tasks', async (req, res) => {
    //Create new task from json in client side
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

})

//Get users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)    
    } catch (error) {
        res.status(500).send(error) 
    }
})

//Get user by ID
app.get('/users/:id', async (req, res) => {
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

//Get tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.send(tasks)    
    } catch (error) {
        res.status(500).send(error) 
    }
})

//Get task by ID
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    //MongoDB was able to find everything asked and get it back even if it was nothing
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(400).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(PORT, () => {
    console.log('Server is up on port',PORT)
})