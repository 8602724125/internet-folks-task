const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/v1', require('./routes/index'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})