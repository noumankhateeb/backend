require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/uesr')

//express app
const app = express()

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/user/', userRoutes)

//connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for the requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to Database and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
