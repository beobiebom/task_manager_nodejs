require('../src/db/mongoose')

const User = require('../src/models/user')

User.findByIdAndUpdate('60e2e30af1345d341c9502de', {age: 20}).then((user) => {
    //Return previous user (not updated)
    console.log(user)
    return User.countDocuments({age: 20})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})