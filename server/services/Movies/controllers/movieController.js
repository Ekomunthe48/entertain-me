const Movie = require('../models/movies')
class MovieController {
    static async findAll (req, res, next) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies);
        } catch (error) {
            next(error)
        }
    }

    static async findOne (req, res, next) {
        let id = req.params.id
        try {
            const movie = await Movie.findOne(id)
            res.status(200).json(movie);
        } catch (error) {
            next(error)
        }
    }

    static async insertOne (req, res, next) {
        let payload = req.body
        try {
            const newMovies = await Movie.insertOne(payload)
            res.status(201).json(newMovies);
        } catch (error) {
            next(error)
        }
    }

    static async updateOne (req, res, next) {
        let id = req.params.id
        let payload = req.body
        try {
            const data = await Movie.findOne(id)
            if (data) {
                const updatedMovie = await Movie.updateOne(id, payload)
                res.status(200).json({
                    msg: 'Success Update Data',
                    data: updatedMovie
                });
            } else {
                throw "resourceNotFound"
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteOne (req, res, next) {
        let id = req.params.id
        let deletedData
        try {
            const data = await Movie.findOne(id)
            deletedData = data
            if (data) {
                await Movie.deleteOne(id)
                res.status(200).json({
                    msg: 'Success Delete Data',
                    data: deletedData
                });
            } else {
                throw "resourceNotFound"
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MovieController