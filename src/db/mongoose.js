const mongoose = require('mongoose')
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true, //save index of document with field in document is: _v: (index)
    useUnifiedTopology: true,
})
