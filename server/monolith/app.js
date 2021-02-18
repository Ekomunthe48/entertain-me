const express = require('express');
const {connectMongo} = require('./mongoDB/mongodb')
const app = express()
const PORT = 3000
const routers = require('./routes')

app.use(express.urlencoded({ extended:true }))
app.use(express.json())

connectMongo().then( async (db) => {
    app.use(routers)

    app.listen(PORT, () => {
        console.log(`Welcome To Port `, PORT);
    });
})

