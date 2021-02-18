const router = require('express').Router()
const moviesRoute = require('./movies')

router.get('/', async (req, res) => {
    res.status(200).json({msg: 'Greeting\'s, welcome to velvet room\'s'});
});

router.use('/movies', moviesRoute)

module.exports = router

