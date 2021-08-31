const Series = require('../models/series')
class SeriesController {

  static async findAll(req, res, next) {
    try {
      const series = await Series.findAll()
     
      res.status(200).json(series)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params
      const series = await Series.findOne(id)

      res.status(200).json(series)
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {

      let newSeries = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: +req.body.popularity,
        tags: [req.body.tags]
      }
      let series = await Series.create(newSeries)
      
      res.status(201).json(series)
    } catch (error) {
      next(error)
    }
  }
  
  static async delete(req, res, next) {
    try {
      const { id } = req.params
      
      const deletedSeries = await Series.delete(id)

      res.status(200).json({message: 'successfully deleted'})
    } catch (error) {
      next(error)
    }
  }

  static async updateOne(req, res, next) {
    try {
      
      const { id } = req.params
      let updateSeries = {
        $set: {

            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: +req.body.popularity,
            tags: [req.body.tags]
          
        }
      }
      const option = { upsert: false}
      let updateSelectedSeries = await Series.update(id, updateSeries, option)
      
      
      res.status(201).json(updateSelectedSeries)
    } catch (error) {
      console.log(error);
     
    }
  }
}

module.exports = SeriesController