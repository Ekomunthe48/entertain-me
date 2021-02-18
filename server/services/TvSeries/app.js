const express = require('express');
const {connectMongo} = require('./config/mongodb')
const app = express()
const PORT = process.env.PORT || 4002
const routers = require('./routes')
const errHandlers = require('./middlewares/errHandlers');

app.use(express.urlencoded({ extended:true }))
app.use(express.json())

connectMongo().then( async (db) => {
    app.use(routers)
    app.use(errHandlers)

    app.listen(PORT, () => {
        console.log(`Welcome To Port `, PORT);
    });
})

