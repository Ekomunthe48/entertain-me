const { ObjectId } = require('mongodb')
const { getDb } = require('../config/mongodb')

class Movie {
    static find() {
        return getDb().collection('Movies').find().toArray()
    }
    static findOne(id) {
        return getDb().collection('Movies').findOne({_id: ObjectId(id)})
    }
    static insertOne(payload) {
        return getDb().collection('Movies').insertOne(payload)
    }
    static updateOne(id, payload) {
        return getDb().collection('Movies').updateOne({_id: ObjectId(id)}, {$set: payload} )
    }
    static deleteOne(id) {
        return getDb().collection('Movies').deleteOne({_id: ObjectId(id)})
    }
}

module.exports = Movie