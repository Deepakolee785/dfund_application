const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// env variables
require('dotenv').config()

// init app
const app = express()

//middlewares
app.use(express.json({ extended: false }))
app.use(cors())

// rotues
app.get('/', (req, res) => {
	res.status(200).json({ message: 'App is working!' })
})

// MongoDB connection
mongoose.connect(
	process.env.DB_CONNECTION_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err, client) => {
		if (err) return console.log(err)

		console.log('MongoDB connected successfully!')

		//listen to port
		const PORT = process.env.PORT || 5000
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	}
)
