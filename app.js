require('dotenv').config()

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const port = process.env.PORT
const URL = process.env.URL



app.use(express.json())
app.listen(port, () => console.log(`listening on port ${port}`))

//routes

const productsRouter = require('./routes/products')

app.use('/api/products', productsRouter)



const start = async () => {
    try {
        await connectDB(URL)
        console.log('connected to DB')
    } catch (error) {
        console.log(error)
    }
}

start()