const Axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

class EntertainMeController {
    static async findAllEntertaint (req, res, next) {
        const cacheEntertaintMe = await redis.get("entertaintMe:data")
        if (cacheEntertaintMe) {
            console.log('From Redis');
            res.status(200).json(JSON.parse(cacheEntertaintMe));
        } else {
            console.log('From Axios');
            try {
                const movies = await Axios.get('http://localhost:4001/movies')
                const tvSeries = await Axios.get('http://localhost:4002/tv')
                let entertaintMeData = {
                    movies: (movies.data),
                    tvSeries: (tvSeries.data)
                }
                redis.set("entertaintMe:data", JSON.stringify(entertaintMeData))
                res.status(200).json(entertaintMeData);
            } catch (error) {
                next(error)
            }
        }
    }
}

module.exports = EntertainMeController