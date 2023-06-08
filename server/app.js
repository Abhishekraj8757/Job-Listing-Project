const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(process.env.PORT,() => {
    console.log(`Server is up and running on port ${process.env.PORT}`)
})