if(process.env.NODE_ENV !== "production") require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { connect } = require('./config/mongodb')
const router = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)


connect()
  .then(() => {
    console.log('successfully connected to db')
    app.listen(port, () => {
      console.log(`server run on port: ${port}`)
    })
  }) 
  .catch((err) => {
    console.log(err);
  })