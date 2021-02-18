const Movie = require('../models/movies')

class MovieController {
    static async findAll (req, res) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies);
        } catch (error) {
            console.log(error);
        }
    }

    static async insertOne (req, res) {
        let payload = req.body
        try {
            const newMovies = await Movie.insertOne(payload)
            res.status(201).json(newMovies);
        } catch (error) {
            console.log(error);
        }
    }

    static async updateOne (req, res) {
        let id = req.params.id
        let payload = req.body
        try {
            const updatedMovie = await Movie.updateOne(id, payload)
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
            await Movie.deleteOne(id)
            res.status(200).json({
                msg: 'Success Delete Data'
            });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MovieController