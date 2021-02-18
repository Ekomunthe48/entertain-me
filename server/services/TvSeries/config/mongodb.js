const { MongoClient } = require('mongodb')

let db = null

async function connectMongo () {
    try {
        const uri = 'mongodb://localhost:27017'

        const client =  new MongoClient(uri, { useUnifiedTopology: true })

        await client.connect()

        const database  = client.db('Entertainme')

        db = database

        return db

    } catch (err) {
        console.log(err);
    }
}

function getDb () {
    return db
}

module.exports = {
    connectMongo,
    getDb
}