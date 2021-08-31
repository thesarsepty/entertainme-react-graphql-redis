const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class Movie {
  
  static movies(){
    return getDatabase().collection('movies')
  }
  static findAll() {
    
    if(getDatabase()){
      return this.movies().find().toArray()
    }
    else {
      return null
    }
  }

  static findOne(id){
    return this.movies().find({ _id: ObjectId(id) }).toArray()
  }

  static create(newMovie){
    return this.movies().insertOne(newMovie)
  }

  static delete(id){
    return this.movies().deleteOne({ _id: ObjectId(id) })
  }

  static update(id, updatedDoc, option){
    return this.movies().updateOne({ _id: ObjectId(id) }, updatedDoc, option)
  }
}

module.exports = Movie