const router = require('express').Router()
const EntertainMeController = require('../controllers/entertainmeController');
const moviesRoute = require('./movies')
const tvSeriesRoute = require('./tvSeries')

router.get('/', async (req, res) => {
    res.status(200).json({msg: 'Greeting\'s, welcome to velvet room\'s'});
});

router.get('/entertainme', EntertainMeController.findAllEntertaint)

router.use('/movies', moviesRoute)
router.use('/tv', tvSeriesRoute)

module.exports = router
