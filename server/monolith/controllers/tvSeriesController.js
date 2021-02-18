const TvSeries = require('../models/tvSeries')

class TvSeriesController {
    static async findAll (req, res) {
        try {
            const movies = await TvSeries.find()
            res.status(200).json(movies);
        } catch (error) {
            console.log(error);
        }
    }

    static async insertOne (req, res) {
        let payload = req.body
        try {
            const newMovies = await TvSeries.insertOne(payload)
            res.status(201).json(newMovies);
        } catch (error) {
            console.log(error);
        }
    }

    static async updateOne (req, res) {
        let id = req.params.id
        let payload = req.body
        try {
            const updatedMovie = await TvSeries.updateOne(id, payload)
            res.status(200).json({
                msg: 'Success Update Data',
                data: updatedMovie
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteOne (req, res) {
        let id = req.params.id
        try {
            await TvSeries.deleteOne(id)
            res.status(200).json({
                msg: 'Success Delete Data'
            });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = TvSeriesController