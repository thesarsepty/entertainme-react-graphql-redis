const router = require('express').Router()
const SeriesController = require('../controllers/seriesController')

router.get('/', SeriesController.findAll)
router.get('/:id', SeriesController.findOne)
router.post('/', SeriesController.create)
router.delete('/:id', SeriesController.delete)
router.put('/:id', SeriesController.updateOne)
module.exports = router
