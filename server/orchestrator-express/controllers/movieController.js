const Axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

class MovieController {
    static async findAll (req, res, next) {
        const cacheMovie = await redis.get("movies:data")
        if (cacheMovie) {
            console.log('From Redis');
            res.status(200).json(JSON.parse(cacheMovie));
        } else {
            console.log('From Axios');
            try {
                const movies = await Axios.get('http://localhost:4001/movies')
                redis.set("movies:data", JSON.stringify(movies.data))
                res.status(200).json(movies.data);
            } catch (error) {
                next(error)
            }
        }
    }

    static async insertOne (req, res, next) {
        let payload = req.body
        try {
            const newMovies = await Axios.post('http://localhost:4001/movies/add', payload)
            if (newMovies) {
                await redis.del("movies:data")
                res.status(201).json(newMovies.data);
            } else {
                throw new Error("Failed")
            }
        } catch (error) {
            next(error)
        }
    }

    static async updateOne (req, res, next) {
        let id = req.params.id
        let payload = req.body
        try {
            const { data } = await Axios.get(`http://localhost:4001/movies/${id}`)
            if (data) {
                const updatedMovie = await Axios.patch(`http://localhost:4001/movies/edit/${id}`, payload)
                if (updatedMovie) {
                    await redis.del("movies:data")
                    res.status(200).json({
                        msg: 'Success Update Data',
                    });
                } else {
                    throw new Error("Failed")
                }
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
            const { data } = await Axios.get(`http://localhost:4001/movies/${id}`)
            deletedData = data
            if (data) {
                const response = Axios.delete(`http://localhost:4001/movies/delete/${id}`)
                if(response) {
                    await redis.del("movies:data")
                    res.status(200).json({
                        msg: 'Success Delete Data',
                        data: deletedData
                    });
                } else {
                    throw ('Failed')
                }
            } else {
                throw "resourceNotFound"
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MovieController