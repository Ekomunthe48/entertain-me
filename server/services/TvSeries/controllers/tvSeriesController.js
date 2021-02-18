const TvSeries = require('../models/tvSeries')

class TvSeriesController {
    static async findAll (req, res, next) {
        try {
            const tvSeries = await TvSeries.find()
            res.status(200).json(tvSeries);

        } catch (error) {
            next(error)
        }
    }

    static async findOne (req, res, next) {
        let id = req.params.id
        try {
            const tvSeries = await TvSeries.findOne(id)
            res.status(200).json(tvSeries);
        } catch (error) {
            next(error)
        }
    }

    static async insertOne (req, res, next) {
        let payload = req.body
        try {
            const newTvSeries = await TvSeries.insertOne(payload)
            res.status(201).json(newTvSeries);
        } catch (error) {
            next(error)
        }
    }

    static async updateOne (req, res, next) {
        let id = req.params.id
        let payload = req.body
        try {
            const data = await TvSeries.findOne(id)
            if (data) {
                const updatedTvSeries = await TvSeries.updateOne(id, payload)
                res.status(200).json({
                    msg: 'Success Update Data',
                    data: updatedTvSeries
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
            const data = await TvSeries.findOne(id)
            deletedData = data
            if (data) {
                await TvSeries.deleteOne(id)
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

module.exports = TvSeriesController