const TvSeriesController = require('../controllers/tvSeriesController')
const router = require('express').Router()

router.get('/', TvSeriesController.findAll)
router.get('/:id', TvSeriesController.findOne)
router.post('/add', TvSeriesController.insertOne)
router.patch('/edit/:id', TvSeriesController.updateOne)
router.delete('/delete/:id', TvSeriesController.deleteOne)

module.exports = router