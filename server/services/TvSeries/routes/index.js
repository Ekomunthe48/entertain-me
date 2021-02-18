const router = require('express').Router()
const tvSeriesRoute = require('./tvSeries')

router.get('/', async (req, res) => {
    res.status(200).json({msg: 'Greeting\'s, welcome to velvet room\'s'});
});

router.use('/tv', tvSeriesRoute)

module.exports = router

