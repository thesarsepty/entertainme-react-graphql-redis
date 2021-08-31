if(process.env.NODE_ENV !== "production") require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const { connect } = require('./config/mongodb')
const router = require('./routes')
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/movies', router)


connect()
  .then(() => {
    console.log('successfully connected to db')
    app.listen(port, () => {
      console.log(`movies run on : ${port}`)
    })
  }) 
  .catch((err) => {
    console.log(err);
  })