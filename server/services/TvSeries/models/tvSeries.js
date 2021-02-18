const { ObjectId } = require('mongodb')
const { getDb } = require('../config/mongodb')

class TvSeries {
    static find() {
        return getDb().collection('TvSeries').find().toArray()
    }
    static findOne(id) {
        return getDb().collection('TvSeries').findOne({_id: ObjectId(id)})
    }
    static insertOne(payload) {
        return getDb().collection('TvSeries').insertOne(payload)
    }
    static updateOne(id, payload) {
        return getDb().collection('TvSeries').updateOne({_id: ObjectId(id)}, {$set: payload} )
    }
    static deleteOne(id) {
        return getDb().collection('TvSeries').deleteOne({_id: ObjectId(id)})
    }
}

module.exports = TvSeries