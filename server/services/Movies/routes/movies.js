const MovieController = require('../controllers/movieController')
const router = require('express').Router()

router.get('/', MovieController.findAll)
router.get('/:id', MovieController.findOne)
router.post('/add', MovieController.insertOne)
router.patch('/edit/:id', MovieController.updateOne)
router.delete('/delete/:id', MovieController.deleteOne)

module.exports = router