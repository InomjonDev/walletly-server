const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// Routes
const transactionRoutes = require('./routes/transactions')
const categoriesRoutes = require('./routes/categories')

const { PORT, DATABASE } = process.env

const app = express()

app.use(express.json())
app.use(cors())

mongoose
	.connect(DATABASE)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch(err => {
		console.error('Error connecting to MongoDB:', err)
	})

app.get('/', (req, res) => {
	res.send('Hello from Walletly API')
})

app.use('/api/transactions', transactionRoutes)
app.use('/api/categories', categoriesRoutes)

app.listen(PORT, () => {
	console.log(`Server is running: http://localhost:${PORT}`)
})
