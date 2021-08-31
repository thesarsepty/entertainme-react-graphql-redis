const { MongoClient } = require('mongodb')
const ATLAS_PASS = process.env.ATLAS_PASS
const uri = `mongodb+srv://admin:${ATLAS_PASS}@entertainme.e2hwy.mongodb.net/entertainme?retryWrites=true&w=majority`

let database = null

async function connect() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    await client.connect()
    const db = await client.db('entertainme')

    database = db
    return db

  } catch (error) {
    console.log(error)
  }

}

function getDatabase () {
  return database
}

module.exports = { connect, getDatabase }