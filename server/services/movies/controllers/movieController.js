const Movie = require('../models/movie')
const { ObjectId } = require('mongodb')
class MovieController {

  static async findAll(req, res, next) {
    try {
      const movies = await Movie.findAll()
      // console.log(movies, 'find');
      res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params
      const movie = await Movie.findOne(id)

      res.status(200).json(movie)
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      // console.log(req.body, 'req')
      let newMovie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: +req.body.popularity,
        tags: [req.body.tags]
      }
      let movie = await Movie.create(newMovie)
      
      // console.log(newMovie, 'newmovie');
      // console.log(movie, 'moviee')
      res.status(201).json(movie)
    } catch (error) {
      next(error)
    }
  }
  
  static async delete(req, res, next) {
    try {
      const { id } = req.params
      
      const deletedMovie = await Movie.delete(id)

      res.status(200).json({message: 'successfully deleted'})
    } catch (error) {
      next(error)
    }
  }

  static async updateOne(req, res, next) {
    try {
      // console.log(req.body, 'req')
      const { id } = req.params
      let updateMovie = {
        $set: {

            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: +req.body.popularity,
            tags: [req.body.tags]
          
        }
      }
      const option = { upsert: false}
      let updateSelectedMovie = await Movie.update(id, updateMovie, option)
      
      
      res.status(201).json(updateSelectedMovie)
    } catch (error) {
      console.log(error);
     
    }
  }
}

module.exports = MovieController