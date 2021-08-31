const router = require('express').Router()
const MovieController = require('../controllers/movieController')
const SeriesController = require('../controllers/seriesController')

// Movie
router.get('/movies', MovieController.findAll)
router.get('/movies/:id', MovieController.findOne)
router.post('/movies', MovieController.create)
router.delete('/movies/:id', MovieController.delete)
router.put('/movies/:id', MovieController.updateOne)


// Series
router.get('/series', SeriesController.findAll)
router.get('/series/:id', SeriesController.findOne)
router.post('/series', SeriesController.create)
router.delete('/series/:id', SeriesController.delete)
router.put('/series/:id', SeriesController.updateOne)

module.exports = router
