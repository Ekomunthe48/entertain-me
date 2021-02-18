const Axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

class TvSeriesController {
    static async findAll (req, res, next) {
        const cacheTvSeries = await redis.get("tvSeries:data")
        if (cacheTvSeries) {
            console.log('From Redis');
            res.status(200).json(JSON.parse(cacheTvSeries));
        } else {
            console.log('From Axios');
            try {
                const tvSeries = await Axios.get('http://localhost:4002/tv')
                redis.set("tvSeries:data", JSON.stringify(tvSeries.data))
                res.status(200).json(tvSeries.data);
            } catch (error) {
                next(error)
            }
        }
    }

    static async insertOne (req, res, next) {
        let payload = req.body
        try {
            const newTvSeries = await Axios.post('http://localhost:4002/tv/add', payload)
            if (newTvSeries) {
                await redis.del("tvSeries:data")
                res.status(201).json(newTvSeries.data);
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
            const { data } = await Axios.get(`http://localhost:4002/tv/${id}`)
            if (data) {
                const updatedTvSeries = await Axios.patch(`http://localhost:4002/tv/edit/${id}`, payload)
                if (updatedTvSeries) {
                    await redis.del("tvSeries:data")
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
            const { data } = await Axios.get(`http://localhost:4002/tv/${id}`)
            deletedData = data
            if (data) {
                const response = Axios.delete(`http://localhost:4002/tv/delete/${id}`)
                if(response) {
                    await redis.del("tvSeries:data")
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

module.exports = TvSeriesController