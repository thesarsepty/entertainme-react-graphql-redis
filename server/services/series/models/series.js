const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class Series {
  
  static series(){
    return getDatabase().collection('series')
  }
  static findAll() {
    
    if(getDatabase()){
      return this.series().find().toArray()
    }
    else {
      return null
    }
  }

  static findOne(id){
    return this.series().find({ _id: ObjectId(id) }).toArray()
  }

  static create(newSeries){
    return this.series().insertOne(newSeries)
  }

  static delete(id){
    return this.series().deleteOne({ _id: ObjectId(id) })
  }

  static update(id, updatedDoc, option){
    return this.series().updateOne({ _id: ObjectId(id) }, updatedDoc, option)
  }
}

module.exports = Series