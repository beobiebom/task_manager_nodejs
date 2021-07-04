//CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//generate ObjectID
const ObjectID = mongodb.ObjectID
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    //get called when actually connected
    if (error) {
        return console.log('Unable to connect to database!')
    }

    console.log('Connected correctly!')

    const db = client.db(databaseName)
    
    //Insert one user into database
    // db.collection('users').insertOne({
    //     name: 'Minh Duc',
    //     age: 20
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
        
    //     //Print array documents
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, 
    //     {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     },
    //     {
    //         description: 'Renew inspection',
    //         completed: false
    //     },
    //     {
    //         description: 'Plot plants',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!')
    //     }

    //     console.log(result.ops)
    // })

    // Read document
    // db.collection('users').findOne({ name: 'Minh Duc'}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     } 

    //     console.log(user)
    // })

    // db.collection('users').findOne({ _id: ObjectID("60e134e328ecf14ed0a9c12a")}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     } 

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 20 }).toArray((error, users) => {
    //     console.log(users)
    // })

    //update document
    // const updatePromise = db.collection('users').updateOne({
    //     _id: ObjectID('60e132ce9dc66342006c3259')
    // }, {
    //     $set: {
    //         name: 'Kim Ngan'
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateOne({
    //     _id: ObjectID('60e134e328ecf14ed0a9c129')
    // },{
    //     $inc: {
    //         age: -8
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})